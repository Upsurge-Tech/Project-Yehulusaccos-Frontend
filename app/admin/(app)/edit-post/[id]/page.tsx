import { ArticleFormState } from "@/data-types/Article";
import getArticle from "@/lib/articles/getArticle";

interface Props {
  params: {
    id: string;
  };
}

const EditPost = async ({ params: { id } }: Props) => {
  const res = await getArticle(parseInt(id), false);
  if ("error" in res) {
    throw new Error(res.error);
  }
  const { article } = res;

  const formState: ArticleFormState = {
    title: article.title,
    thumbnail: { file: null, alt: article.title },
    unknown: "",
    contents: article.contents.map((c) => {
      if (c.type === "heading") {
        return { type: "heading", heading: c.heading };
      } else if (c.type === "paragraph") {
        return { type: "paragraph", paragraph: c.paragraph };
      } else if (c.type === "image") {
        return { type: "image", alt: c.alt, file: null, previousSrc: c.src };
      } else {
        throw new Error(`unknown type  ${c.type}`);
      }
    }),
  };
  return <div>EditPost</div>;
};

export default EditPost;
