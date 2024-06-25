import { Article } from "@/data-types/Article";

const bothArticle: Article = {
  id: 1,
  langIds: ["en", "am"],
  title: {
    en: "Yehulu Business Ventures",
    am: "የተቋቋመ የፋይናንሺያል ህብረት ስራ ማህበር ሲ",
  },

  excerpt: {
    en: "Abcd Yehulu Business Ventures",
    am: "የየፋይናንሺያ የፋይናንሺያ የፋይናንሺያ ልልልተቋቋመ የፋይናንሺያል ህብረት ስራ ማህበር ሲ",
  },
  thumbnail: "/article-images/car.jpg",
  createdAt: new Date().toISOString(),
  contents: [
    { id: 1, youtubeId: "1flyzdxsteo", type: "youtube" },
    {
      id: 2,
      type: "heading",
      heading: {
        en: "our services",
        am: "የእኛ አገልግሎት",
      },
    },
    {
      id: 3,
      type: "image",
      src: "/article-images/house.jpg",
      alt: "alt text",
    },

    {
      id: 4,
      type: "paragraph",
      paragraph: {
        en: "our services",
        am: "የእኛ አገልግሎት",
      },
    },

    
    {
      id: 5,
      type: "paragraph",
      paragraph: {
        en: "we offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.we offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.",
        am: " ህብረት ስራ ማህበር ሲሆን አላማውም ለሁሉም በተለይም ለባህላዊ የባንክ አማራጮች ብቁ ላልሆኑ የቁጠባ እና የብድር አገልግሎት በቀላሉ ተደራሽ ለማድረግ",
      },
    },
  ],
};

const enArticle: Article = {
  id: 2,
  langIds: ["en"],
  title: {
    en: "English only Yehulu Business Ventures",
    am: "",
  },

  excerpt: {
    en: "Abcd Yehulu Business Ventures",
    am: "",
  },
  thumbnail: "/article-images/car.jpg",
  createdAt: new Date().toISOString(),
  contents: [
    { id: 1, youtubeId: "1FLYZdxsteo", type: "youtube" },
    {
      id: 2,
      type: "heading",
      heading: {
        en: "Our Services",
        am: "",
      },
    },
    {
      id: 3,
      type: "image",
      src: "/article-images/house.jpg",
      alt: "alt text",
    },

    {
      id: 4,
      type: "paragraph",
      paragraph: {
        en: "Our Services",
        am: "",
      },
    },

    {
      id: 5,
      type: "paragraph",
      paragraph: {
        en: "We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.We offer loan packages where collaterals aren’t needed depending on the business profitability and if the customer is a member of our organization.",
        am: "",
      },
    },
  ],
};

const amArticle: Article = {
  id: 3,
  langIds: ["am"],
  title: {
    en: "",
    am: "አማርኛ only የተቋቋመ የፋይናንሺያል ህብረት ስራ ማህበር ሲ",
  },

  excerpt: {
    en: "",
    am: "የየፋይናንሺያ የፋይናንሺያ የፋይናንሺያ ልልልተቋቋመ የፋይናንሺያል ህብረት ስራ ማህበር ሲ",
  },
  thumbnail: "/article-images/car.jpg",
  createdAt: new Date().toISOString(),
  contents: [
    { id: 1, youtubeId: "1flyzdxsteo", type: "youtube" },
    {
      id: 2,
      type: "heading",
      heading: {
        en: "",
        am: "የእኛ አገልግሎት",
      },
    },
    {
      id: 3,
      type: "image",
      src: "/article-images/house.jpg",
      alt: "alt text",
    },

    {
      id: 4,
      type: "paragraph",
      paragraph: {
        en: "",
        am: "የእኛ አገልግሎት",
      },
    },

    {
      id: 5,
      type: "paragraph",
      paragraph: {
        en: "",
        am: " ህብረት ስራ ማህበር ሲሆን አላማውም ለሁሉም በተለይም ለባህላዊ የባንክ አማራጮች ብቁ ላልሆኑ የቁጠባ እና የብድር አገልግሎት በቀላሉ ተደራሽ ለማድረግ",
      },
    },
  ],
};

export const articles: Article[] = [bothArticle, amArticle, enArticle];

export default articles;
