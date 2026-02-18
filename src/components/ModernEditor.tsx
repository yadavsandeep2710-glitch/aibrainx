'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import FloatingMenuExtension from '@tiptap/extension-floating-menu';
import { useCallback, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import {
    FaBold, FaItalic, FaUnderline, FaQuoteRight, FaCode,
    FaListUl, FaListOl, FaLink, FaImage, FaPlus, FaHeading,
    FaStrikethrough
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
                    levels: [2, 3],
                },
            }),
            Underline,
            BubbleMenuExtension,
            FloatingMenuExtension,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-accent-primary underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full rounded-lg shadow-md my-8 mx-auto block',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Tell your story...',
            }),
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

    const handleImageUpload = async (file: File) => {
        if (!editor) return;
        setIsUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const filePath = `blog-content/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(filePath);

            editor.chain().focus().setImage({ src: publicUrl }).run();
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image.');
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
                <div className="w-px h-4 bg-[var(--border-subtle)] mx-1 self-center" />
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
            </BubbleMenu>

            {/* Floating Menu: Appears on Empty Lines */}
            <FloatingMenu editor={editor} className={styles.floatingMenu}>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaHeading size={14} /></div>
                    <div>
                        <strong>Heading</strong>
                        <p style={{ fontSize: '11px', opacity: 0.7 }}>Large section heading</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaListUl /></div>
                    <div>
                        <strong>Bullet List</strong>
                        <p style={{ fontSize: '11px', opacity: 0.7 }}>Simple bulleted list</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaQuoteRight /></div>
                    <div>
                        <strong>Quote</strong>
                        <p style={{ fontSize: '11px', opacity: 0.7 }}>Tell a story with quotes</p>
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
                        <p style={{ fontSize: '11px', opacity: 0.7 }}>Add an image from your files</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}><FaCode /></div>
                    <div>
                        <strong>Code Block</strong>
                        <p style={{ fontSize: '11px', opacity: 0.7 }}>Write code with highlighting</p>
                    </div>
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={styles.floatingItem}
                >
                    <div className={styles.floatingItemIcon}>—</div>
                    <div>
                        <strong>Divider</strong>
                        <p style={{ fontSize: '11px', opacity: 0.7 }}>Section break</p>
                    </div>
                </button>
            </FloatingMenu>

            <EditorContent editor={editor} />
        </div>
    );
}
