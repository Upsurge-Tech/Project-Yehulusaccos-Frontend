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

export interface HeadingFormContent {
  type: "heading";
  heading: string;
}

export interface ParagraphFormContent {
  type: "paragraph";
  paragraph: string;
}
export interface ImageFormContent {
  type: "image";
  alt: string;
  file: File | null;
}
export interface YouTubeFormContent {
  elementId: string;
  type: "youtube";
  youtubeLink: string;
  error: string;
}

export type FormContent =
  | HeadingFormContent
  | ParagraphFormContent
  | ImageFormContent
  | YouTubeFormContent;

export interface ArticleFormState {
  title: string;
  thumbnail: File | null;
  unknown: string;
  contents: FormContent[];
}
