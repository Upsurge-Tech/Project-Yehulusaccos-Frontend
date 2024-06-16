import React from "react";

import AboutUs from "@/components/about/AboutUs";
import Team from "@/components/about/Team";
import OurOffice from "@/components/about/OurOffice";

const AboutPage = () => {
  return (
    <div className="container my-5 md:my-10 lg:my-16 xl:my-36 flex flex-col items-center w-full overflow-hidden md:gap-y-16 xl:gap-y-[250px] min-h-screen ">
      <AboutUs />
      <Team />
      <OurOffice />
    </div>
  );
};

export default AboutPage;
