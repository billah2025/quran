'use client';

import { useState, useEffect } from 'react';
import { db } from '@/utils/firebase';
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
interface QAItem {
  id: string;
  question: string;
  answer: string;
  answeredBy: string;
  category: string;
  date: string;
  createdAt?: string; // You can refine this if you know the exact type returned by `serverTimestamp()`
}

import type { Editor } from '@tiptap/core';

export default function QAFormWithList() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [answeredBy, setAnsweredBy] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [answeredByList, setAnsweredByList] = useState<string[]>([]);
  const [qnaList, setQnaList] = useState<QAItem[]>([]);
  const [filteredList, setFilteredList] = useState<QAItem[]>([]);
  
  const [uploading, setUploading] = useState(false);

  const [showList, setShowList] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterAnsweredBy, setFilterAnsweredBy] = useState('');

  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight, TextStyle, Color],
    content: answer,
    onUpdate({ editor }: { editor: Editor }) {
      setAnswer(editor.getHTML());
    },
  });

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setAnsweredBy('');
    setCategory('');
    setDate('');
    setEditingId(null);
    editor?.commands.setContent('');
  };

  const loadQAs = async () => {
    const snapshot = await getDocs(collection(db, 'qa'));
    const list: QAItem[] = [];
    const cats = new Set<string>();
    const authors = new Set<string>();
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const item: QAItem = {
        id: docSnap.id,
        question: data.question || '',
        answer: data.answer || '',
        answeredBy: data.answeredBy || '',
        category: data.category || '',
        date: data.date || '',
        createdAt: data.createdAt,
      };
      list.push(item);
    });
    
    setQnaList(list);
    setFilteredList(list); // default: show all
    setCategories(Array.from(cats));
    setAnsweredByList(Array.from(authors));
  };

  useEffect(() => {
    loadQAs();
  }, []);

  const handleSubmit = async () => {
    if (!question || !answer || !answeredBy || !category || !date) {
      alert('Please fill all fields');
      return;
    }

    setUploading(true);

    const data = {
      question,
      answer,
      answeredBy,
      category,
      date,
      createdAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await setDoc(doc(db, 'qa', editingId), data);
        alert('Q&A updated!');
      } else {
        await addDoc(collection(db, 'qa'), data);
        alert('Q&A added!');
      }
      resetForm();
      await loadQAs();
    } catch (err) {
      console.error('Error saving Q&A:', err);
      alert('Failed to save Q&A.');
    }

    setUploading(false);
  };

  const handleEdit = (item: QAItem) => {
    setEditingId(item.id);
    setQuestion(item.question || '');
    setAnswer(item.answer || '');
    setAnsweredBy(item.answeredBy || '');
    setCategory(item.category || '');
    setDate(item.date || '');
    editor?.commands.setContent(item.answer || '');
  };

  const handleDelete = async (item: QAItem ) => {
    const confirmation = prompt(`Type the category name (${item.category}) to confirm deletion`);
    if (confirmation === item.category) {
      try {
        await deleteDoc(doc(db, 'qa', item.id));
        alert('Deleted successfully.');
        await loadQAs();
      } catch (err) {
        console.error(err);
        alert('Failed to delete.');
      }
    } else {
      alert('Category name mismatch. Deletion cancelled.');
    }
  };

  const applyFilter = () => {
    const filtered = qnaList.filter((item) => {
      return (
        (!filterCategory || item.category === filterCategory) &&
        (!filterAnsweredBy || item.answeredBy === filterAnsweredBy)
      );
    });
    setFilteredList(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-green-50 rounded-xl border shadow text-black">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        {editingId ? 'Edit Islamic Q&A' : 'Create New Islamic Q&A'}
      </h2>

      <textarea
        className="border p-2 w-full rounded mb-2"
        rows={3}
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {editor && (
        <div className="flex gap-2 mb-2 flex-wrap text-sm">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn-format">Bold</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn-format">Italic</button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn-format">Underline</button>
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className="btn-format">Highlight</button>
        </div>
      )}

      <div className="border rounded p-2 bg-white mb-2">
        <EditorContent editor={editor} className="min-h-[200px]" />
      </div>

      <input
        list="answered-by-list"
        className="border p-2 w-full rounded mb-2"
        placeholder="Answered By (e.g. assunnahtrust.org)"
        value={answeredBy}
        onChange={(e) => setAnsweredBy(e.target.value)}
      />
      <datalist id="answered-by-list">
        {answeredByList.map((name, idx) => (
          <option key={`${name}-${idx}`} value={name} />
        ))}
      </datalist>

      <input
        list="category-list"
        className="border p-2 w-full rounded mb-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <datalist id="category-list">
        {categories.map((cat, idx) => (
          <option key={`${cat}-${idx}`} value={cat} />
        ))}
      </datalist>

      <input
        className="border p-2 w-full rounded mb-4"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded shadow"
        >
          {uploading ? 'Saving...' : editingId ? 'Update Q&A' : 'Publish Q&A'}
        </button>

        {editingId && (
          <button
            onClick={resetForm}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded shadow"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-green-800">All Q&A Entries</h3>
        <button
          onClick={() => setShowList(!showList)}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-1 rounded text-sm"
        >
          {showList ? 'Hide List' : 'Show List'}
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={`${cat}-${idx}`} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={filterAnsweredBy}
          onChange={(e) => setFilterAnsweredBy(e.target.value)}
        >
          <option value="">All Answered By</option>
          {answeredByList.map((name, idx) => (
            <option key={`${name}-${idx}`} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          onClick={applyFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filter
        </button>
      </div>

      {showList && (
        <ul className="space-y-3">
          {filteredList.map((item) => (
            <li key={item.id} className="bg-white p-3 border rounded shadow flex justify-between items-start">
              <div>
                <p className="font-medium text-green-700">{item.question}</p>
                <p className="text-sm text-gray-500">
                  Category: {item.category} | Answered By: {item.answeredBy}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .btn-format {
          padding: 4px 8px;
          background: #e6f4ea;
          border: 1px solid #b5dbbf;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-format:hover {
          background: #d4f1e2;
        }
      `}</style>
    </div>
  );
}
