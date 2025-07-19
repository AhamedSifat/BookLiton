export default function BookingSkeleton() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
      <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
        <div className='grid md:grid-cols-[1fr_2fr] gap-8 animate-pulse'>
          {/* Booking Details Skeleton */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit'>
            <div className='h-6 bg-gray-200 rounded w-1/2 mb-6'></div>
            <div className='space-y-4'>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              <div className='h-4 bg-gray-200 rounded w-2/3'></div>
            </div>
          </div>

          {/* Booking Form Skeleton */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
            <div className='h-8 bg-gray-200 rounded w-1/3 mb-6'></div>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='h-12 bg-gray-200 rounded'></div>
              <div className='h-12 bg-gray-200 rounded'></div>
              <div className='h-12 bg-gray-200 rounded col-span-2'></div>
            </div>
            <div className='h-24 bg-gray-200 rounded mb-6'></div>
            <div className='h-16 bg-gray-200 rounded mb-6'></div>
            <div className='h-12 bg-gray-200 rounded w-32 ml-auto'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
