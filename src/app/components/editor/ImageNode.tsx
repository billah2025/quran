// components/ImageNode.tsx
import { DecoratorNode, LexicalEditor, SerializedLexicalNode } from 'lexical';
import * as React from 'react';

type Props = { src: string };

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src);
  }

  constructor(src: string) {
    super();
    this.__src = src;
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('img');
    dom.src = this.__src;
    dom.className = 'my-4 max-w-full rounded';
    return dom;
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode: SerializedLexicalNode): ImageNode {
    return new ImageNode((serializedNode as any).src);
  }

  exportJSON(): any {
    return {
      type: 'image',
      src: this.__src,
      version: 1,
    };
  }
}

export function $createImageNode(src: string): ImageNode {
  return new ImageNode(src);
}
