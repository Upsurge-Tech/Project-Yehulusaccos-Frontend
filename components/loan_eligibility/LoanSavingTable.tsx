import React from "react";
import { useTranslations } from "next-intl";

const rows = [
  { days: 100, interest: 5, insurance: 1 },
  { days: 200, interest: 9, insurance: 2 },
  { days: 300, interest: 11, insurance: 3 },
  { days: 365, interest: 11, insurance: 3 },
];

const LoanSavingTable = () => {
  const tLoanTable = useTranslations("Loan.LoanTable");
  return (
    <div className="relative  border-[1px] border-primary/90 rounded-md overflow-x-auto place-self-center md:mr-5 lg:mr-0 lg:place-self-end w-full sm:w-[400px] lg:w-[500px] xl:w-[600px]">
      <table className="w-full text-sm text-left rtl:text-right  border-[1px] border-primary/90">
        <thead className="text-xs text-gray-700 uppercase bg-green-200 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-[1px] border-primary/90">
            <th
              scope="col"
              className="px-6 py-3 border-[1px] border-primary/90"
            >
              {tLoanTable("Days")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 border-[1px] border-primary/90"
            >
              {tLoanTable("Interest")}(%)
            </th>
            <th
              scope="col"
              className="px-6 py-3 border-[1px] border-primary/90"
            >
              {tLoanTable("Insurance")}(%)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.days}
              className="text-gray-50 bg-primary/65 border-[1px] border-primary/90"
            >
              <td className="px-6 py-4 border-[1px] border-primary/90">
                {row.days}{" "}
              </td>
              <td className="px-6 py-4 border-[1px] border-primary/90">
                {row.interest} %
              </td>
              <td className="px-6 py-4 border-[1px] border-primary/90">
                {row.insurance} %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanSavingTable;
