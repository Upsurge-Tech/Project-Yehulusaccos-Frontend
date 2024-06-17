import React from "react";

import ContactUs from "@/components/contact/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yehulu | Contact Us",
};

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ContactUs />
    </div>
  );
};

export default ContactPage;
