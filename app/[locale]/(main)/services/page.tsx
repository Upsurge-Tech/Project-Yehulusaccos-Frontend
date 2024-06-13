import React from "react";

import LoanSavingServices from "@/components/services/LoanSavingServices";
import SavingServices from "@/components/services/SavingServices";
import LoanServices from "@/components/services/LoanServices";

const ServicesPage = () => {
  return (
    <div className="container my-5 md:my-10 lg:my-16 xl:my-36 flex flex-col items-center w-full overflow-hidden gap-y-5  min-h-screen ">
      <LoanSavingServices />
      <SavingServices />
      <LoanServices />
    </div>
  );
};

export default ServicesPage;
