export const contentTypeStrings = [
  "heading",
  "paragraph",
  "image",
  "youtube",
] as const;
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

export type ArticleContent =
  | HeadingContent
  | ParagraphContent
  | ImageContent
  | YouTubeContent;

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  createdAt: string; //a date string
  contents: ArticleContent[];
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
  elementId: string;
  alt: string;
  file: File | null;
  localUrl: string | null;
  previousSrc?: string; //string if editing image
  error: string;
  compressing: boolean;
  compressed: boolean;
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
  thumbnail: ImageFormContent;
  unknown: string;
  contents: FormContent[];
}
