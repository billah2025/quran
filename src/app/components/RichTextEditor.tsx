'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import ToolbarPlugin from './ToolbarPlugin';
import { $getRoot } from 'lexical';

interface Props {
  onChange: (content: string) => void;
}

export default function RichTextEditor({ onChange }: Props) {
  const initialConfig = {
    namespace: 'BlogEditor',
    theme: {},
    onError: (error: Error) => {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-gray-300 rounded p-4">
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none min-h-[200px] px-2 py-1" />}
          placeholder={<div className="text-gray-400">Write something awesome...</div>}
          ErrorBoundary={() => <div>Error</div>}
        />

        <HistoryPlugin />

        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const html = $getRoot().getTextContent(); // For now just plain text
              onChange(html);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}
