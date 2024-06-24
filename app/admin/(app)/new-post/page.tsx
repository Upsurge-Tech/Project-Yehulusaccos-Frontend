import ArticleForm from "@/components/admin/ArticleForm";
import { ArticleFormState } from "@/data-types/Article";

const NewPost = () => {
  const state: ArticleFormState = {
    title: "",
    thumbnail: {
      compressing: false,
      compressed: false,
      type: "image",
      loadingSrc: false,
      elementId: "thumbnail",
      file: null,
      localUrl: null,
      src: "",
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
