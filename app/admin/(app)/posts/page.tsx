import DeletePostModal from "@/components/admin/DeletePostModal";
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
import { langList } from "@/data-types/Languages";
import getArticles from "@/lib/articles/getArticles";
import dateFormat from "dateformat";
import Link from "next/link";

const Posts = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let page: number = 1;
  if (searchParams.page) {
    page = parseInt(searchParams.page as string);
    if (isNaN(page)) {
      page = 1;
    }
  }
  const size = 10;

  const res = await getArticles({ page, size, offset: 0 });
  if ("error" in res) {
    throw new Error(res.error);
  }
  const { articles, numPages } = res;
  // console.log("articles", articles);

  return (
    <main className="py-9">
      <h1 className="text-primary font-bold text-2xl pb-6">Posts</h1>
      <PostsPagination numPages={numPages} page={page} size={size} />
      <Table className="max-h-[25vh] overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">Languages</TableHead>
            <TableHead className="hidden sm:table-cell">Title</TableHead>
            <TableHead className="hidden sm:table-cell">
              Date Published
            </TableHead>
            <TableHead className="hidden sm:table-cell">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-auto">
          {articles.map((article, i) => (
            <TableRow key={article.id} className="flex flex-col sm:table-row">
              <TableCell className="font-medium">
                {article.langIds
                  .map((lang) => langList.find((l) => l.lang === lang)?.label)
                  .filter((l) => l)
                  .join(", ")}
              </TableCell>
              <TableCell className="font-medium">
                {article.langIds.map((lang) => (
                  <h3>{article.title[lang]}</h3>
                ))}
              </TableCell>
              <TableCell>
                {dateFormat(article.createdAt, "dd mmmm, yyyy, h:MM TT")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/news/${article.id}`}>
                    <Button size={"sm"} variant={"outline"}>
                      Read
                    </Button>
                  </Link>

                  <Link href={`/admin/edit-post/${article.id}`}>
                    <Button size={"sm"} className="bg-tertiary text-white">
                      Edit
                    </Button>
                  </Link>

                  <DeletePostModal id={article.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {numPages === 0 && articles.length === 0 && (
        <p className="pt-9 text-muted-foreground text-center">
          -- No news posts have been created --
        </p>
      )}
    </main>
  );
};

export default Posts;
