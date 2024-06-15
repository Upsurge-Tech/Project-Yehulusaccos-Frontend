import { Article } from "@/data-types/Article";

const article: Article = {
  id: 1,
  title:
    "New business ventures and expansions Yehulu is planning to come up with.",
  excerpt: "About yehulus commitment",
  thumbnail: "/article-images/car.jpg",
  createdAt: new Date().toISOString(),
  contents: [
    { id: 1, articleId: 1, youtubeId: "1FLYZdxsteo", type: "youtube" },
    { id: 2, articleId: 1, type: "heading", heading: "Heading 1" },
    {
      id: 3,
      articleId: 1,
      type: "image",
      src: "/article-images/house.jpg",
      alt: "alt text",
    },

    {
      id: 4,
      articleId: 1,
      type: "paragraph",
      paragraph:
        "We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.",
    },

    {
      id: 5,
      articleId: 1,
      type: "paragraph",
      paragraph:
        "We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.",
    },

    {
      id: 6,
      articleId: 1,

      type: "paragraph",
      paragraph:
        "We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.",
    },
  ],
};
export const articles: Article[] = Array.from({ length: 55 }).map((_, i) => ({
  ...article,
  id: i + 1,
  title: `${i + 1} ${article.title}`,
}));

export default articles;
