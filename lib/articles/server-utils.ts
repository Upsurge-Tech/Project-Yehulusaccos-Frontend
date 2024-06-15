import fs from "node:fs/promises";
import path from "path";

const toAbolutePath = (filePath: string) => {
  const segments = filePath.split("/");
  const absolutePath = path.join(process.cwd(), "public", ...segments);
  return absolutePath;
};

export const saveFiles = async (files: File[], filePaths: string[]) => {
  await Promise.all(
    files.map(async (file, i) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await fs.writeFile(toAbolutePath(filePaths[i]), buffer);
    })
  );
};

export const removeFilesIfExist = async (filePaths: string[]) => {
  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        await fs.unlink(toAbolutePath(filePath));
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
