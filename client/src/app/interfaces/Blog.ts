export interface Blogs {
  blogs: Blog[];
}

export interface Blog {
  _id: string;
  createdAt: string;
  title: string;
  description: string;
  markdown: string;
  slug?: string;
  sanitizedHtml?: string;
  __V: string;
}
