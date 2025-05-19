'use client';
import ImageResize from 'tiptap-extension-resize-image';

import FontSize from 'tiptap-fontsize-extension';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align'; 
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Link from '@tiptap/extension-link';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';

export default function BlogCreateForm() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const [writer, setWriter] = useState('');
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [writers, setWriters] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchMeta = async () => {
            const writerSnap = await getDocs(collection(db, 'writers'));
            setWriters(writerSnap.docs.map((doc) => doc.data().name));

            const categorySnap = await getDocs(collection(db, 'categories'));
            setCategories(categorySnap.docs.map((doc) => doc.data().name));
        };
        fetchMeta();
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: false }),
            Heading.configure({ levels: [1, 2, 3] }),
            FontSize.configure({ defaultSize: '16px', step: 1 }),
            ImageResize,  // <--- This enables resizable images
            TextStyle,
            Image,
            Table,
            TableRow,
            TableCell,
            TableHeader,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Underline,
            Highlight,
            Link.configure({ openOnClick: false }),
            HorizontalRule,
            Blockquote,
            BulletList,
            OrderedList,
            ListItem,
            CharacterCount.configure({ limit: 10000 }),
            Color,
        ],
        content: '',
    });

    const uploadImageToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=40e58544cb5b668e512765223d0f98eb`, {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        return data.data.url;
    };

    const addImage = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async () => {
            const file = fileInput.files?.[0];
            if (file) {
                const url = await uploadImageToImgBB(file);
                editor?.chain().focus().setImage({ src: url }).run();
            }
        };
        fileInput.click();
    };

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = await uploadImageToImgBB(file);
            setCoverImage(url);
        }
    };

    const handleSubmit = async () => {
        if (!title || !subtitle || !editor || !writer || !category || !date || !coverImage) return;
        setUploading(true);
    
        const html = editor.getHTML();
    
        // Add new writer if not in list
        if (!writers.includes(writer)) {
            await addDoc(collection(db, 'writers'), { name: writer });
        }
    
        // Add new category if not in list
        if (!categories.includes(category)) {
            await addDoc(collection(db, 'categories'), { name: category });
        }
    
        await addDoc(collection(db, 'blogs'), {
            title,
            subtitle,
            content: html,
            writer,
            category,
            keyword,
            coverImage,
            publishedAt: date,
            createdAt: serverTimestamp(),
        });
    
        setUploading(false);
        alert('Blog added!');
    };
    

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4 bg-green-50 border rounded-xl shadow-md text-black-800 ">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Create New Islamic Blog</h2>

            <input className="border px-3 py-2 w-full rounded  text-black  " placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="border px-3 py-2 w-full rounded text-black  " placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />

            <input type="file" accept="image/*" onChange={handleCoverImageUpload} className=" text-black  block w-full border rounded p-2 text-sm" />
            {coverImage && <img src={coverImage} alt="Cover" className="w-full h-48 object-cover rounded border" />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black  ">
                <div>
                    <label className="block text-sm font-medium text-green-900 mb-1 text-black  ">Writer</label>
                    <input list="writer-list" className="border px-3 py-2 w-full rounded text-black  " value={writer} onChange={(e) => setWriter(e.target.value)} />
                    <datalist id="writer-list">
                        {writers.map((w) => <option key={w} value={w} />)}
                    </datalist>
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-900 mb-1 text-black  ">Category</label>
                    <input list="category-list" className="border px-3 py-2 w-full rounded text-black  " value={category} onChange={(e) => setCategory(e.target.value)} />
                    <datalist id="category-list">
                        {categories.map((c) => <option key={c} value={c} />)}
                    </datalist>
                </div>
            </div>

            <input className="border px-3 py-2 w-full rounded text-black  " placeholder="Keywords (comma separated)" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <input className="border px-3 py-2 w-full rounded text-black  " type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <div className="flex gap-2 flex-wrap text-sm">
                <button onClick={() => editor?.chain().focus().toggleBold().run()} className={` text-black  px-3 py-1 border rounded ${editor?.isActive('bold') ? 'bg-green-300' : ''}`}>Bold</button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={` text-black  px-3 py-1 border rounded ${editor?.isActive('italic') ? 'bg-green-300' : ''}`}>Italic</button>
                <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className={` text-black  px-3 py-1 border rounded ${editor?.isActive('underline') ? 'bg-green-300' : ''}`}>Underline</button>
                <button onClick={() => editor?.chain().focus().toggleHighlight().run()} className={`p text-black  x-3 py-1 border rounded ${editor?.isActive('highlight') ? 'bg-yellow-300' : ''}`}>Highlight</button>
                <button onClick={() => editor?.commands.decreaseFontSize()} className=" text-black  px-2 py-1 border rounded">A-</button>
                <button onClick={() => editor?.commands.increaseFontSize()} className=" text-black  px-2 py-1 border rounded">A+</button>
                <button onClick={() => editor?.commands.setFontSize('24px')} className=" text-black  px-2 py-1 border rounded">24px</button>
            </div>

            <div className="flex gap-2 flex-wrap text-sm">
                <button onClick={addImage} className="px-3 py-1 bg-green-600 text-white rounded text-black  ">Insert Image</button>
                <button onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Blockquote</button>
                <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>Bullet List</button>
                <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>Ordered List</button>
                <button onClick={() => editor?.chain().focus().setHorizontalRule().run()}>HR</button>
                <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code Block</button>
                <button onClick={() => {
                    const url = prompt('Enter URL');
                    if (url) editor?.chain().focus().setLink({ href: url }).run();
                }}>Link</button>
                <button onClick={() => editor?.chain().focus().unsetLink().run()}>Unlink</button>
                <button onClick={() => {
                    const color = prompt('Enter Hex Color');
                    if (color) editor?.chain().focus().setColor(color).run();
                }}>Text Color</button>
            </div>

            <div className="border rounded p-2 bg-white">
                <EditorContent editor={editor} className="min-h-[300px]" />
            </div>

            <button disabled={uploading} onClick={handleSubmit} className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded shadow">
                {uploading ? 'Saving...' : 'Publish Blog'}
            </button>
        </div>
    );
}
