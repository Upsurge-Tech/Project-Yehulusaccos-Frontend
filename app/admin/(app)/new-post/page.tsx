import ArticleForm from "@/components/admin/ArticleForm";
import { ArticleFormState } from "@/data-types/Article";

const NewPost = () => {
  const state: ArticleFormState = {
    langs: ["en", "am"],
    title: { elementId: "title", type: "title", title: { am: "", en: "" } },
    thumbnail: {
      type: "image",
      elementId: "thumbnail",
      file: null,
      localUrl: null,
      src: null,
      alt: "",
      error: "",
    },
    contents: [
      {
        type: "paragraph",
        elementId: "p1-en",
        paragraph: { am: "", en: "" },
      },
    ],
  };
  return <ArticleForm initialFormState={state} />;
};

export default NewPost;
