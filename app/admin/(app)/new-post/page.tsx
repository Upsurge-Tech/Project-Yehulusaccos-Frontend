import ArticleForm from "@/components/admin/ArticleForm";
import { ArticleFormState } from "@/data-types/Article";

const NewPost = () => {
  const state: ArticleFormState = {
    title: "title",
    thumbnail: {
      type: "image",
      elementId: "thumbnail",
      file: null,
      alt: "",
      error: "",
    },
    unknown: "",
    contents: [
      { type: "heading", heading: "heading" },
      { type: "paragraph", paragraph: "paragraph" },
    ],
  };
  return <ArticleForm initialFormState={state} />;
};

export default NewPost;
