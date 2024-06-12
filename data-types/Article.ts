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
  error: string;
  isDirty: boolean;
}

export interface ParagraphFormContent {
  type: "paragraph";
  paragraph: string;
  error: string;
  isDirty: boolean;
}
export interface ImageFormContent {
  type: "image";
  alt: string;
  file: File | null;
  error: string;
  isDirty: boolean;
}
export interface YouTubeFormContent {
  type: "youtube";
  youtubeLink: string;
  error: string;
  isDirty: boolean;
}

export interface ArticleFormState {
  title: { error: string; title: string; isDirty: boolean };
  thumbnail: { error: string; thumbnail: File | null; isDirty: boolean };
  unknown: string;
  contents: (
    | HeadingFormContent
    | ParagraphFormContent
    | ImageFormContent
    | YouTubeFormContent
  )[];
}
