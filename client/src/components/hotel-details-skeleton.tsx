export default function HotelDetailsSkeleton() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
      <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
        <div className='space-y-8 animate-pulse'>
          {/* Header skeleton */}
          <div className='space-y-4'>
            <div className='flex space-x-1'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='h-5 w-5 bg-gray-200 rounded'></div>
              ))}
            </div>
            <div className='h-10 bg-gray-200 rounded-lg w-1/2'></div>
            <div className='h-6 bg-gray-200 rounded w-1/3'></div>
          </div>

          {/* Images skeleton */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='h-64 bg-gray-200 rounded-xl'></div>
            ))}
          </div>

          {/* Facilities skeleton */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='h-12 bg-gray-200 rounded-lg'></div>
            ))}
          </div>

          {/* Content skeleton */}
          <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8'>
            <div className='space-y-3'>
              {[...Array(6)].map((_, i) => (
                <div key={i} className='h-4 bg-gray-200 rounded w-full'></div>
              ))}
            </div>
            <div className='h-96 bg-gray-200 rounded-xl'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
