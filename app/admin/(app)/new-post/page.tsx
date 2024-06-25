import ArticleForm from "@/components/admin/ArticleForm";
import { ArticleFormState } from "@/data-types/Article";

const NewPost = () => {
  const state: ArticleFormState = {
    title: "",
    thumbnail: {
      type: "image",
      elementId: "thumbnail",
      file: null,
      localUrl: null,
      src: null,
      alt: "",
      error: "",
    },
    unknown: "",
    contents: [
      { elementId: "heading1", type: "heading", heading: "" },
      { elementId: "para1", type: "paragraph", paragraph: "" },
    ],
  };
  return <ArticleForm initialFormState={state} />;
};

export default NewPost;
