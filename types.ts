export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  color: 'blue' | 'pink' | 'purple' | 'cyan';
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  shortDescription: string;
  content: ContentBlock[];
  icon?: string;
}

export interface ContentBlock {
  type: 'text' | 'image' | 'quote' | 'list' | 'link-grid' | 'info-box';
  value: string | string[] | { title: string; url: string; desc: string }[];
  title?: string; // For info-box
  alt?: string; // For images
}