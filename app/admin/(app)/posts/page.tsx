import PostsPagination from "@/components/admin/PostsPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Article } from "@/data-types/Article";
import dateFormat from "dateformat";
import Link from "next/link";

type Response = { error: string } | { data: Article[]; numPages: number };

const Posts = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page: number = 1;
  if (searchParams.page) {
    page = parseInt(searchParams.page as string);
  }
  const size = 5;

  const res = await fetch(
    `${"http://localhost:3000"}/api/articles?page=${page}&size=${size}`
  );
  const data = (await res.json()) as Response;
  if ("error" in data) {
    throw new Error(data.error);
  }
  const numPages = data.numPages;

  console.log(data);

  return (
    <main className="">
      <h1 className="text-primary font-bold text-2xl pb-6">Posts</h1>
      <PostsPagination numPages={numPages} page={page} size={size} />
      <Table className="max-h-[25vh] overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">Title</TableHead>
            <TableHead className="hidden sm:table-cell">
              Date Published
            </TableHead>
            <TableHead className="hidden sm:table-cell">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-auto">
          {data.data.map((article, i) => (
            <TableRow key={article.id} className="flex flex-col sm:table-row">
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>
                {dateFormat(article.createdAt, "dd mmmm, yyyy, h:MM TT")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/news/${article.id}`} className="hidden">
                    <Button size={"sm"} variant={"ghost"}>
                      Read
                    </Button>
                  </Link>

                  <Link href={`/admin/edit-post/${article.id}`}>
                    <Button size={"sm"} className="bg-tertiary text-white">
                      Edit
                    </Button>
                  </Link>

                  <Button size={"sm"} variant={"destructive"}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default Posts;
