import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

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
  console.log(pages);
  const maxPages = 6;
  const midPoint = Math.ceil(numPages / 2);
  const span = Math.min(midPoint, Math.floor(maxPages / 2));
  const leftPages = pages.slice(0, span);
  const rightPages = pages.slice(numPages - span, numPages);

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
            className={page === currentPage ? "active font-bold" : ""}
          >
            {page}
          </button>
        ))}
        {pages.length > maxPages && <span>...</span>}
        {rightPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "active font-bold" : ""}
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
