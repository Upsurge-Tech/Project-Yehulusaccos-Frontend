import React from "react";

import EligibilityCriteria from "@/components/loan_eligibility/EligibilityCriteria";
import LoanApprovalProcess from "@/components/loan_eligibility/LoanApprovalProcess";
import LoanServices from "@/components/loan_eligibility/LoanServices";

const LoanEligibilityPage = () => {
  return (
    <div
      className="container my-20 flex flex-col items-center w-full overflow-hidden gap-y-48 min-h-screen"
      suppressHydrationWarning
    >
      <EligibilityCriteria />
      <LoanApprovalProcess />
      <LoanServices />
    </div>
  );
};

export default LoanEligibilityPage;
