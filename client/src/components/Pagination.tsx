import { ChevronLeft, ChevronRight } from 'lucide-react';

export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  // Show max 5 page numbers at a time
  const getVisiblePages = () => {
    if (pages <= 5) return pageNumbers;

    const start = Math.max(1, page - 2);
    const end = Math.min(pages, start + 4);
    const adjustedStart = Math.max(1, end - 4);

    const visible = [];
    for (let i = adjustedStart; i <= end; i++) {
      visible.push(i);
    }
    return visible;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex justify-center items-center space-x-2 py-8'>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className='flex items-center space-x-1 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors'
      >
        <ChevronLeft className='h-4 w-4' />
        <span className='hidden sm:block'>Previous</span>
      </button>

      {/* First page if not visible */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className='px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium'
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className='px-2 py-2 text-gray-500'>...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      <div className='flex space-x-1'>
        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === number
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Last page if not visible */}
      {visiblePages[visiblePages.length - 1] < pages && (
        <>
          {visiblePages[visiblePages.length - 1] < pages - 1 && (
            <span className='px-2 py-2 text-gray-500'>...</span>
          )}
          <button
            onClick={() => onPageChange(pages)}
            className='px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors font-medium'
          >
            {pages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className='flex items-center space-x-1 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors'
      >
        <span className='hidden sm:block'>Next</span>
        <ChevronRight className='h-4 w-4' />
      </button>

      {/* Page Info */}
      <div className='hidden md:flex items-center ml-4 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg'>
        Page {page} of {pages}
      </div>
    </div>
  );
};

export default Pagination;
