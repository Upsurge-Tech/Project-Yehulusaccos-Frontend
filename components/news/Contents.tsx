import React from "react";
import Image from "next/image";

import {
  HeadingContent,
  ParagraphContent,
  ImageContent,
  YouTubeContent,
} from "@/data-types/Article";
import FadeIn from "../animation/FadeIn";

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
            <FadeIn duration={0.2} className="" key={content.id}>
              <p className="text-gray-500 text-[13px] sm:text-sm md:text-md">
                {content.paragraph}
              </p>
            </FadeIn>
          );
        if (content.type === "youtube")
          return (
            <FadeIn className="w-full" duration={0.2} key={content.youtubeId}>
              <iframe
                src={`https://www.youtube.com/embed/${content.youtubeId}`}
                allowFullScreen
                className="h-[35vh] w-full sm:h-[50vh] xl:h-[80vh] rounded-lg"
              />
            </FadeIn>
          );
        if (content.type === "heading")
          return (
            <FadeIn className="" key={content.id} duration={0.2}>
              <h3 className="font-medium text-lg md:text-xl lg:text-2xl">
                {content.heading}
              </h3>
            </FadeIn>
          );
        if (content.type === "image")
          return (
            <FadeIn
              key={content.id}
              duration={0.2}
              className="relative w-full h-[35vh] sm:h-[50vh] xl:h-[80vh]"
            >
              <Image
                src={content.src}
                className="rounded-lg object-cover"
                fill
                alt=""
                priority
              />
            </FadeIn>
          );
      })}
    </div>
  );
};

export default Contents;
