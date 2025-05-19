// models/Blog.ts
export interface Blog {
    id?: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    content: string; // HTML content
    createdAt: number; // Date.now()
    views: number; // for popular section
  }
  