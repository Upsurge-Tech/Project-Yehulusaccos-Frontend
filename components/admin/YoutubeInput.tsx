import { Input } from "@/components/ui/input";
import { ArticleFormState } from "@/data-types/Article";
import { getVideoId, replaceContent } from "@/lib/articles/utils";
import error from "next/error";
import Image from "next/image";
import { default as Link } from "next/link";
import { FaYoutube } from "react-icons/fa6";
import { Label } from "../ui/label";

const YoutubeInput = ({
  index,
  formState,
  setFormState,
  validate,
}: {
  index: number;
  formState: ArticleFormState;
  setFormState: React.Dispatch<React.SetStateAction<ArticleFormState>>;
  validate: (link: string) => string;
}) => {
  const content = formState.contents[index];
  if (content.type !== "youtube") throw new Error("Content type mismatch");
  const videoId = getVideoId(content.youtubeLink);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div>
      {error && <p className="text-destructive text-sm">{content.error}</p>}
      <Label htmlFor={content.elementId}>{index + 1}. Youtube video</Label>
      <Input
        required
        id={content.elementId}
        value={content.youtubeLink}
        onChange={(e) => {
          setFormState((s) =>
            replaceContent(
              s,
              {
                ...content,
                youtubeLink: e.target.value,
                error: validate(e.target.value),
              },
              index
            )
          );
        }}
        placeholder="Paste the link of the video"
      />

      {videoId && (
        <div className="relative w-[200px] max-h-[200px]">
          <Link href={content.youtubeLink} target="_blank">
            <FaYoutube className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-3xl text-white/80 " />
            <Image
              src={thumbnail}
              alt={error ? "Broken Link" : `Youtube link`}
              width={250}
              height={250}
              className="rounded h-full w-full"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default YoutubeInput;
