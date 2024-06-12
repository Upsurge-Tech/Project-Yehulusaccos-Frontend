import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col   bg-stone-50">
      <NavBar />
      <div className="mt-[70px]">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
