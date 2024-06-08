import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col px-10 py-5 bg-stone-200">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
