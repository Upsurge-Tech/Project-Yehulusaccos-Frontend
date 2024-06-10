import { Article } from "@/data-types/Article";
import db from "@/db";
import { adminTable } from "@/db/schema";
import Image from "next/image";

const Test = () => {
  return (
    <iframe
      className="w-1/2 aspect-video self-stretch md:min-h-96"
      src="https://www.youtube.com/embed/1FLYZdxsteo"
      title="Product Overview Video"
      aria-hidden="true"
    />
  );
};

const DummyFetchAdmins = async () => {
  const fetchAdmins = async () => {
    "use server";
    const res = await db.select().from(adminTable);
    return res;
  };
  const data = await fetchAdmins();
  return (
    <div>
      <h1>Test</h1>
      {JSON.stringify(data)}
    </div>
  );
};

export default Test;
const DummyFetchArticles = async () => {
  const res = await fetch("http://localhost:3000/api/articles", {
    cache: "no-store",
  });
  const { data } = (await res.json()) as { data: Article[] };
  return (
    <div>
      {data.map(({ id, title, thumbnail, contents, createdAt }) => (
        <div className="border" key={id}>
          <h1 className="font-bold">{title}</h1>
          <Image alt={title} src={thumbnail} width={150} height={150} />
          {contents.map((content) => (
            <div key={content.id}>
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
            </div>
          ))}

          <p>{new Date(createdAt).toDateString()}</p>
        </div>
      ))}
    </div>
  );
};
