import React from "react";
import Image from "next/image";

import {
  HeadingContent,
  ParagraphContent,
  ImageContent,
  YouTubeContent,
} from "@/data-types/Article";

interface Props {
  contents: (
    | HeadingContent
    | ParagraphContent
    | ImageContent
    | YouTubeContent
  )[];
}

const Contents = ({ contents }: Props) => {
  return (
    <div className="flex flex-col gap-y-5">
      {contents.map((content) => {
        if (content.type === "paragraph")
          return (
            <p
              key={content.id}
              className="text-gray-500 text-[13px] sm:text-sm md:text-md"
            >
              {content.paragraph}
            </p>
          );
        if (content.type === "youtube")
          return (
            <iframe
              key={content.youtubeId}
              src={`https://www.youtube.com/embed/${content.youtubeId}`}
              allowFullScreen
              className="h-[35vh] sm:h-[50vh] xl:h-[80vh] rounded-lg"
            />
          );
        if (content.type === "heading")
          return (
            <h3
              className="font-medium text-lg md:text-xl lg:text-2xl"
              key={content.id}
            >
              {content.heading}
            </h3>
          );
        if (content.type === "image")
          return (
            <div
              key={content.id}
              className="relative w-full h-[35vh] sm:h-[50vh] xl:h-[80vh]"
            >
              <Image
                src={content.src}
                className="rounded-lg object-cover"
                fill
                alt=""
                priority
              />
            </div>
          );
      })}
    </div>
  );
};

export default Contents;
