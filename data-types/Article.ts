export const contentTypeStrings = [
  "heading",
  "paragraph",
  "image",
  "youtube",
] as const;

export type Lang = "am" | "en";
export interface HeadingContent {
  type: "heading";
  heading: string;
  langId: Lang;
}

export interface ParagraphContent {
  type: "paragraph";
  paragraph: string;
  langId: Lang;
}

export interface ImageContent {
  type: "image";
  src: string;
  alt: string;
}

export interface YouTubeContent {
  type: "youtube";
  youtubeId: string;
}

export type ArticleContent =
  | HeadingContent
  | ParagraphContent
  | ImageContent
  | YouTubeContent;

export interface Article {
  id: number;
  title: HeadingContent;
  excerpt: ParagraphContent;
  thumbnail: string;
  createdAt: string; //a date string
  contents: ArticleContent[];
}

export interface HeadingFormContent {
  elementId: string;
  type: "heading";
  heading: string;
  langId: Lang;
}

export interface ParagraphFormContent {
  elementId: string;
  type: "paragraph";
  paragraph: string;
  langId: Lang;
}
export interface ImageFormContent {
  type: "image";
  elementId: string;
  alt: string;
  file: File | null;
  localUrl: string | null;
  src: string | null; //string if editing image
  error: string;
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
  title: HeadingFormContent;
  thumbnail: ImageFormContent;
  contents: FormContent[];
}
