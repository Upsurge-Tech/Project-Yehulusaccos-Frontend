import fs from "node:fs/promises";
import path from "path";

export const saveFiles = async (files: File[], filePaths: string[]) => {
  await Promise.all(
    files.map(async (file, i) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const absolutePath = path.join(process.cwd(), "public", filePaths[i]);
      await fs.writeFile(absolutePath, buffer);
    })
  );
};

export const removeFilesIfExist = async (filePaths: string[]) => {
  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        const absolutePath = path.join(process.cwd(), "public", filePath);
        await fs.unlink(absolutePath);
      } catch (e) {
        if (e instanceof Error && "code" in e && e.code === "ENOENT") {
          return;
        } else {
          //let it crash if it can't delete the file
          console.error("cant delte", e);
          throw e;
        }
      }
    })
  );
};
