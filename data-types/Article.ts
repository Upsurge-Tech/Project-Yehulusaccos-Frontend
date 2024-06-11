export interface HeadingContent {
  type: "heading";
  id: number;
  articleId: number;
  heading: string;
}

export interface ParagraphContent {
  type: "paragraph";
  id: number;
  articleId: number;
  paragraph: string;
}

export interface ImageContent {
  type: "image";
  id: number;
  articleId: number;
  src: string;
  alt: string;
}

export interface YouTubeContent {
  type: "youtube";
  id: number;
  articleId: number;
  youtubeId: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  createdAt: string; //a date string
  contents: (
    | HeadingContent
    | ParagraphContent
    | ImageContent
    | YouTubeContent
  )[];
}
