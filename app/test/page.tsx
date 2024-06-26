import db from "@/db";
import { adminTable } from "@/db/schema";
import dateFormat from "dateformat";

const Test = () => {
  return <div>{dateFormat(new Date())}</div>;
};

const YoutubeTest = () => {
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
