import { ReactNode } from "react";
import ScaleToRight from "../animation/ScaleToRight";

const StepsLi = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  return (  
    <li className="flex w-full relative">
      <div className="absolute w-full right-0 h-0.5 bg-primary/10 lg:top-5 top-3 left-4"></div>
      <ScaleToRight
        duration={0.3}
        delay={0.3 * (index + 1)}
        startImmediately
        className="absolute w-full right-0 h-0.5  lg:top-5 top-3 left-4"
      >
        <div className="w-full h-full bg-primary/50"></div>
      </ScaleToRight>
      {children}
    </li>
  );
};

export default StepsLi;
