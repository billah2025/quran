// components/ToolbarPlugin.tsx
'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_IMAGE_COMMAND } from '@/utils/commands';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=40e58544cb5b668e512765223d0f98eb`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.data.url;
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, imageUrl);
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  return (
    <div className="mb-2">
      <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded">
        Upload Image
        <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
      </label>
    </div>
  );
}
