import React from "react";
import Image from "next/image";

import CustomAvatar from "./CustomAvatar";
import { useTranslations } from "next-intl";
import TitleFadeIn from "../animation/TitleFadeIn";
import FadeIn from "../animation/FadeIn";

const Team = () => {
  const tTeam = useTranslations("AboutUs.Team");
  const tTeamMembers = useTranslations("AboutUs.Team.Members");
  const teamMembers = ["Person1", "Person2", "Person3", "Person4", "Person5"];
  return (
    <div className="flex flex-col h-full items-start place-self-center justify-center py-5 gap-y-5 xl:gap-y-14 w-3/4 xl:w-full">
      <div className="flex flex-col xl:self-center">
        <div className="bg-primarySoft lg:mb-10 self-start xl:self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          {tTeam("Header")}
        </div>
        <TitleFadeIn
          title={tTeam("Title")}
          className="font-semibold text-3xl lg:text-5xl mt-2 lg:mt-0"
        />
        <div className="hidden lg:flex relative -rotate-45 -top-20 left-[250px]">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={80}
            height={100}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:flex gap-5 2xl:gap-x-16 flex-wrap place-items-center xl:justify-center">
        {teamMembers.map((member, index) => (
          <FadeIn delay={index / 2.5} className="" key={index}>
            <CustomAvatar
              name={tTeamMembers(`${member}.name`)}
              role={tTeamMembers(`${member}.role`)}
              src={tTeamMembers(`${member}.src`)}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default Team;
