"use server";
import { ArticleFormState } from "@/data-types/Article";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

export async function saveArticle(
  formData: FormData,
  article: ArticleFormState
) {
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await fs.writeFile(`./public/article-images/__${file.name}`, buffer);

  revalidatePath("/");
}
