import { Article } from "@/data-types/Article";
import Image from "next/image";
import { HeadingContent } from "@/data-types/Article";

const Test = async () => {
  const res = await fetch("http://localhost:3000/api/articles", {
    cache: "no-store",
  });
  const { data } = (await res.json()) as { data: Article[] };
  return (
    <div>
      {data.map(({ title, thumbnail, contents, createdAt }) => (
        <div className="border">
          <h1 className="font-bold">{title}</h1>
          <Image alt={title} src={thumbnail} width={150} height={150} />
          {contents.map((content) => (
            <>
              {content.type === "heading" && (
                <h2 className="font-bold" key={content.id}>
                  {content.heading}
                </h2>
              )}
              {content.type === "image" && (
                <Image
                  alt={content.alt}
                  key={content.id}
                  src={content.src}
                  width={150}
                  height={150}
                />
              )}

              {content.type === "paragraph" && (
                <p key={content.id}>{content.paragraph}</p>
              )}
            </>
          ))}

          <p>{new Date(createdAt).toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
