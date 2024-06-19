import ArticleForm from "@/components/admin/ArticleForm";
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
    thumbnail: {
      compressing: false,
      compressed: true,
      localUrl: null,
      elementId: "thumbnail",
      type: "image",
      file: null,
      previousSrc: article.thumbnail,
      alt: article.title,
      error: "",
    },
    unknown: "",
    contents: article.contents.map((c, i) => {
      if (c.type === "heading") {
        return { type: "heading", heading: c.heading };
      } else if (c.type === "paragraph") {
        return { type: "paragraph", paragraph: c.paragraph };
      } else if (c.type === "image") {
        return {
          type: "image",
          alt: c.alt,
          compressing: false,
          compressed: true,
          file: null,
          localUrl: null,
          previousSrc: c.src,
          elementId: `img_${c.src}`,
          error: "",
        };
      } else if (c.type === "youtube") {
        return {
          type: "youtube",
          youtubeLink: `https://www.youtube.com/watch?v=${c.youtubeId}`,
          elementId: `youtube_${c.youtubeId}`,
          error: "",
        };
      } else {
        throw new Error("Unknown content type");
      }
    }),
  };
  return <ArticleForm articleId={article.id} initialFormState={formState} />;
};

export default EditPost;
