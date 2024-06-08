import React from "react";

import Intro from "@/components/home/Intro";
import OurBelieve from "@/components/home/OurBelieve";
import OurUniqeness from "@/components/home/OurUniqeness";
import Testimonials from "@/components/home/Testimonials";
import Metrics from "@/components/home/Metrics";

const HomePage = () => {
  return (
    <div className="container my-20 flex flex-col w-full gap-y-48 min-h-screen">
      <Intro />
      <OurBelieve />
      <OurUniqeness />
      <Testimonials />
      <Metrics />
    </div>
  );
};

export default HomePage;
