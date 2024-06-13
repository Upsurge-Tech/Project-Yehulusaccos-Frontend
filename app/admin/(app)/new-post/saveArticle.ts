"use server";
import { ArticleFormState } from "@/data-types/Article";
import fs from "node:fs/promises";

export async function saveArticle(
  formData: FormData,
  article: ArticleFormState
) {
  console.log("images", formData.get("images"));
  const filePaths = await Promise.all(
    Array.from(formData.getAll("images") as File[]).map(async (file, i) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const path = `article-images/__${Math.round(Math.random() * 1000)}_${file.name}`;
      await fs.writeFile(`./public/${path}`, buffer);
      return path;
    })
  );
  console.log("filePaths", filePaths);

  // revalidatePath("/");
}
