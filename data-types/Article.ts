import { Lang } from "./Languages";

export const contentTypeStrings = [
  "heading",
  "paragraph",
  "image",
  "youtube",
  "title",
] as const;

export interface HeadingContent {
  type: "heading";
  id: number;
  heading: { [key in Lang]: string };
}

export interface ParagraphContent {
  type: "paragraph";
  id: number;
  paragraph: { [key in Lang]: string };
}

export interface ImageContent {
  type: "image";
  id: number;
  src: string;
  alt: string;
}

export interface YouTubeContent {
  type: "youtube";
  id: number;
  youtubeId: string;
}

export type ArticleContent =
  | HeadingContent
  | ParagraphContent
  | ImageContent
  | YouTubeContent;

export interface Article {
  langIds: Lang[];
  id: number;
  title: { [key in Lang]: string };
  excerpt: { [key in Lang]: string };
  thumbnail: string;
  createdAt: string; //a date string
  contents: ArticleContent[];
}

export interface HeadingFormContent {
  elementId: string;
  type: "heading";
  heading: { [key in Lang]: string };
}
export interface TitleFormContent {
  title: { [key in Lang]: string };
  type: "title";
  elementId: string;
}

export interface ParagraphFormContent {
  elementId: string;
  type: "paragraph";
  paragraph: { [key in Lang]: string };
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
  | TitleFormContent
  | HeadingFormContent
  | ParagraphFormContent
  | ImageFormContent
  | YouTubeFormContent;

export interface ArticleFormState {
  langs: Lang[];
  title: TitleFormContent;
  thumbnail: ImageFormContent;
  contents: FormContent[];
}
