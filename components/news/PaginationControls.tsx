import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const Pagination = ({ numPages, currentPage, onPageChange }: { numPages: number; currentPage: number; onPageChange: (page: number) => void }) => {
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center text-primary">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={` ${currentPage === 1 ? "opacity-50": ""} flex justify-between items-center gap-x-3`}
      >
        <FaArrowLeftLong size={25}/>
        Oldest
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === numPages}
        className={` ${currentPage === numPages ? "opacity-50": ""} flex justify-between items-center gap-x-3`}
      >
        Newest
        <FaArrowRightLong size={25} />
      </button>
    </div>
  );
};
export default Pagination;