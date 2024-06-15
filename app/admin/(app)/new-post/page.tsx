import ArticleForm from "@/components/admin/ArticleForm";
import { ArticleFormState } from "@/data-types/Article";

const NewPost = () => {
  const state: ArticleFormState = {
    title: "title",
    thumbnail: { file: null, alt: "" },
    unknown: "",
    contents: [
      { type: "heading", heading: "heading" },
      { type: "paragraph", paragraph: "paragraph" },
    ],
  };
  return <ArticleForm initialFormState={state} />;
};

export default NewPost;
