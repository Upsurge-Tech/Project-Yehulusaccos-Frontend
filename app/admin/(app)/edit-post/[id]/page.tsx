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
  const getRandomId = () => `${Math.floor(Math.random() * 1000000)}`;

  const formState: ArticleFormState = {
    title: article.title,
    thumbnail: {
      localUrl: null,
      elementId: "thumbnail",
      type: "image",
      file: null,
      src: article.thumbnail,
      alt: article.title,
      error: "",
    },
    unknown: "",
    contents: article.contents.map((c, i) => {
      if (c.type === "heading") {
        return {
          elementId: getRandomId(),
          type: "heading",
          heading: c.heading,
        };
      } else if (c.type === "paragraph") {
        return {
          elementId: getRandomId(),
          type: "paragraph",
          paragraph: c.paragraph,
        };
      } else if (c.type === "image") {
        return {
          type: "image",
          alt: c.alt,
          loadingSrc: false,
          file: null,
          localUrl: null,
          src: c.src,
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
