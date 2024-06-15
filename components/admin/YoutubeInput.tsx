import { Input } from "@/components/ui/input";
import { getVideoId } from "@/lib/articles/utils";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa6";

const YoutubeInput = ({
  id,
  error,
  onLinkChange,
  link,
}: {
  id: string;
  error: string;
  onLinkChange: (link: string, error: string) => void;
  link: string;
}) => {
  const videoId = getVideoId(link);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <Input
        required
        id={id}
        value={link}
        onChange={(e) => {
          const link = e.target.value;
          onLinkChange(
            link,
            !getVideoId(link)
              ? "Please paste a valid youtube link (eg: https://www.youtube.com/watch?v=Abc123Abc )"
              : ""
          );
        }}
        placeholder="Paste the link of the video"
      />

      {videoId && (
        <div className="relative w-[200px] max-h-[200px]">
          <Link href={link} target="_blank">
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
