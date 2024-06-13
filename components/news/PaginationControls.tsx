import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const Pagination = ({
  numPages,
  currentPage,
  onPageChange,
}: {
  numPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);
  const leftPages = pages.slice(0, 2);
  const rightPages = pages.slice(numPages - 2, numPages);

  return (
    <div className="w-full flex justify-between items-center text-primary">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={` ${currentPage === 1 ? "opacity-50" : ""} flex justify-between items-center gap-x-3`}
      >
        <FaArrowLeftLong size={25} className="hidden md:inline-block" />
        Oldest
      </button>
      <div className="flex gap-2">
        {leftPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        {numPages > 4 && <span>...</span>}
        {rightPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === numPages}
        className={` ${currentPage === numPages ? "opacity-50" : ""} flex justify-between items-center gap-x-3`}
      >
        Newest
        <FaArrowRightLong size={25} className="hidden md:inline" />
      </button>
    </div>
  );
};

export default Pagination;
