import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = ({ spin }: { spin: boolean }) => {
  if (!spin) return null;
  return <AiOutlineLoading3Quarters className="animate-spin" />;
};

export default Spinner;
