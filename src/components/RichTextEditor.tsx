'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import {
    FaBold, FaItalic, FaStrikethrough, FaUnderline, FaQuoteRight, FaCode,
    FaListUl, FaListOl, FaLink, FaImage, FaYoutube, FaUndo, FaRedo,
    FaAlignLeft, FaAlignCenter, FaAlignRight, FaHeading
} from 'react-icons/fa';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-accent-primary underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full rounded-lg shadow-md my-4',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start writing...',
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4',
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
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const triggerImageUpload = () => {
        fileInputRef.current?.click();
    };

    if (!editor) {
        return <div className="p-4 text-center text-text-muted">Loading editor...</div>;
    }

    return (
        <div className="rich-text-editor border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--surface-card)]">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                }}
            />

            <div className="editor-toolbar flex flex-wrap gap-1 p-2 border-b border-[var(--border-color)] bg-[var(--surface-hover)] sticky top-0 z-10">
                {/* Text Formatting */}
                <div className="flex gap-1 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        icon={<FaBold />}
                        title="Bold"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        icon={<FaItalic />}
                        title="Italic"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        icon={<FaUnderline />}
                        title="Underline"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        icon={<FaStrikethrough />}
                        title="Strikethrough"
                    />
                </div>

                <div className="w-px h-6 bg-[var(--border-color)] mx-1 self-center" />

                {/* Headings */}
                <div className="flex gap-1 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        icon={<span className="font-bold text-xs">H1</span>}
                        title="Heading 1"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        icon={<span className="font-bold text-xs">H2</span>}
                        title="Heading 2"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        icon={<span className="font-bold text-xs">H3</span>}
                        title="Heading 3"
                    />
                </div>

                <div className="w-px h-6 bg-[var(--border-color)] mx-1 self-center" />

                {/* Alignment */}
                <div className="flex gap-1 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                        icon={<FaAlignLeft />}
                        title="Align Left"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                        icon={<FaAlignCenter />}
                        title="Align Center"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                        icon={<FaAlignRight />}
                        title="Align Right"
                    />
                </div>

                <div className="w-px h-6 bg-[var(--border-color)] mx-1 self-center" />

                {/* Lists & Quotes */}
                <div className="flex gap-1 mr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        icon={<FaListUl />}
                        title="Bullet List"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        icon={<FaListOl />}
                        title="Ordered List"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        icon={<FaQuoteRight />}
                        title="Quote"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={editor.isActive('codeBlock')}
                        icon={<FaCode />}
                        title="Code Block"
                    />
                </div>

                <div className="w-px h-6 bg-[var(--border-color)] mx-1 self-center" />

                {/* Media */}
                <div className="flex gap-1 mr-2">
                    <ToolbarButton
                        onClick={setLink}
                        isActive={editor.isActive('link')}
                        icon={<FaLink />}
                        title="Link"
                    />
                    <ToolbarButton
                        onClick={triggerImageUpload}
                        isActive={false}
                        icon={isUploading ? <span className="animate-spin">⏳</span> : <FaImage />}
                        title="Upload Image"
                        disabled={isUploading}
                    />
                    <ToolbarButton
                        onClick={addYoutube}
                        isActive={editor.isActive('youtube')}
                        icon={<FaYoutube />}
                        title="Add YouTube Video"
                    />
                </div>

                <div className="w-px h-6 bg-[var(--border-color)] mx-1 self-center ml-auto" />

                {/* History */}
                <div className="flex gap-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        isActive={false}
                        disabled={!editor.can().undo()}
                        icon={<FaUndo />}
                        title="Undo"
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        isActive={false}
                        disabled={!editor.can().redo()}
                        icon={<FaRedo />}
                        title="Redo"
                    />
                </div>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}

function ToolbarButton({ onClick, isActive, disabled, icon, title }: { onClick: () => void, isActive: boolean, disabled?: boolean, icon: React.ReactNode, title: string }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            type="button"
            className={`
                p-2 rounded transition-colors text-sm flex items-center justify-center min-w-[32px] min-h-[32px]
                ${isActive ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-active)] hover:text-[var(--text-primary)]'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            {icon}
        </button>
    );
}
