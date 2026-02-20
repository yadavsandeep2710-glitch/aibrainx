'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';
import CharacterCount from '@tiptap/extension-character-count';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
import { useCallback, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import {
    FaBold, FaItalic, FaUnderline, FaQuoteRight, FaCode,
    FaListUl, FaListOl, FaLink, FaImage, FaPlus, FaHeading,
    FaStrikethrough, FaYoutube, FaAlignLeft, FaAlignCenter, FaAlignRight,
    FaUndo, FaRedo
} from 'react-icons/fa';
import styles from './ModernEditor.module.css';

interface ModernEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function ModernEditor({ value, onChange, placeholder }: ModernEditorProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            BubbleMenuExtension,
            FloatingMenuExtension,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-accent-primary underline hover:text-accent-secondary transition-colors',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full rounded-xl shadow-lg my-12 mx-auto block hover:opacity-95 transition-opacity cursor-pointer',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Youtube.configure({
                inline: false,
                HTMLAttributes: {
                    class: 'rounded-xl shadow-lg my-12 mx-auto block max-w-full aspect-video',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Tell your story...',
            }),
            CharacterCount,
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: `${styles.editorContent} prose prose-invert max-w-none focus:outline-none min-h-[500px]`,
            },
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addYoutube = useCallback(() => {
        if (!editor) return;
        const url = window.prompt('Enter YouTube URL');
        if (url) {
            editor.commands.setYoutubeVideo({ src: url });
        }
    }, [editor]);

    const handleImageUpload = async (file: File) => {
        if (!editor) return;
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const data = await response.json();
            const publicUrl = data.url;

            const altText = window.prompt('Enter image description (ALT text) for SEO', '');

            editor.chain().focus().setImage({
                src: publicUrl,
                alt: altText || file.name,
                title: altText || file.name
            }).run();
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (!editor) return null;

    return (
        <div className={styles.editorWrapper}>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                }}
                style={{ display: 'none' }}
            />

            {/* Bubble Menu: Appears on Text Selection */}
            <BubbleMenu editor={editor} className={styles.bubbleMenu}>
                <div className={styles.bubbleGroup}>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`${styles.bubbleButton} ${editor.isActive('bold') ? styles.bubbleButtonActive : ''}`}
                        title="Bold"
                    >
                        <FaBold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`${styles.bubbleButton} ${editor.isActive('italic') ? styles.bubbleButtonActive : ''}`}
                        title="Italic"
                    >
                        <FaItalic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`${styles.bubbleButton} ${editor.isActive('underline') ? styles.bubbleButtonActive : ''}`}
                        title="Underline"
                    >
                        <FaUnderline />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`${styles.bubbleButton} ${editor.isActive('strike') ? styles.bubbleButtonActive : ''}`}
                        title="Strikethrough"
                    >
                        <FaStrikethrough />
                    </button>
                </div>

                <div className={styles.bubbleDivider} />

                <div className={styles.bubbleGroup}>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`${styles.bubbleButton} ${editor.isActive({ textAlign: 'left' }) ? styles.bubbleButtonActive : ''}`}
                        title="Align Left"
                    >
                        <FaAlignLeft />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`${styles.bubbleButton} ${editor.isActive({ textAlign: 'center' }) ? styles.bubbleButtonActive : ''}`}
                        title="Align Center"
                    >
                        <FaAlignCenter />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`${styles.bubbleButton} ${editor.isActive({ textAlign: 'right' }) ? styles.bubbleButtonActive : ''}`}
                        title="Align Right"
                    >
                        <FaAlignRight />
                    </button>
                </div>

                <div className={styles.bubbleDivider} />

                <div className={styles.bubbleGroup}>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`${styles.bubbleButton} ${editor.isActive('heading', { level: 2 }) ? styles.bubbleButtonActive : ''}`}
                        title="Heading 2"
                    >
                        <FaHeading size={12} />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`${styles.bubbleButton} ${editor.isActive('blockquote') ? styles.bubbleButtonActive : ''}`}
                        title="Quote"
                    >
                        <FaQuoteRight />
                    </button>
                    <button
                        onClick={setLink}
                        className={`${styles.bubbleButton} ${editor.isActive('link') ? styles.bubbleButtonActive : ''}`}
                        title="Link"
                    >
                        <FaLink />
                    </button>
                </div>
            </BubbleMenu>

            {/* Floating Menu: Appears on Empty Lines */}
            <FloatingMenu editor={editor} className={styles.floatingMenu}>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}>H1</div>
                    <div>
                        <strong>Main Title</strong>
                        <p>Largest heading</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}>H2</div>
                    <div>
                        <strong>Section Heading</strong>
                        <p>Standard section title</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaListUl /></div>
                    <div>
                        <strong>Bullet List</strong>
                        <p>Simple bullet points</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaListOl /></div>
                    <div>
                        <strong>Numbered List</strong>
                        <p>Sequential list</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaQuoteRight /></div>
                    <div>
                        <strong>Quote</strong>
                        <p>Highlight text with quotes</p>
                    </div>
                </button>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}>
                        {isUploading ? <span className="animate-spin">⏳</span> : <FaImage />}
                    </div>
                    <div>
                        <strong>Image</strong>
                        <p>Add image from device</p>
                    </div>
                </button>
                <button
                    onClick={addYoutube}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaYoutube /></div>
                    <div>
                        <strong>YouTube</strong>
                        <p>Embed video</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}>—</div>
                    <div>
                        <strong>Divider</strong>
                        <p>Horizontal line</p>
                    </div>
                </button>
            </FloatingMenu>

            <EditorContent editor={editor} />

            {/* Editor Footer: Stats & Actions */}
            <div className={styles.editorFooter}>
                <div className={styles.editorStats}>
                    <span>{editor.storage.characterCount.words()} words</span>
                    <span className={styles.statDivider}>|</span>
                    <span>{editor.storage.characterCount.characters()} characters</span>
                </div>
                <div className={styles.editorActions}>
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className={styles.actionButton}
                        title="Undo"
                    >
                        <FaUndo />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className={styles.actionButton}
                        title="Redo"
                    >
                        <FaRedo />
                    </button>
                </div>
            </div>
        </div>
    );
}
