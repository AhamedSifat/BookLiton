export default function HotelSkeleton() {
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse'>
      {/* Header skeleton */}
      <div className='flex justify-between items-start mb-4'>
        <div className='h-8 bg-gray-200 rounded-lg w-1/3'></div>
        <div className='h-6 bg-gray-200 rounded-full w-24'></div>
      </div>

      {/* Image skeleton */}
      <div className='h-48 bg-gray-200 rounded-xl mb-4'></div>

      {/* Description skeleton */}
      <div className='space-y-2 mb-6'>
        <div className='h-4 bg-gray-200 rounded w-full'></div>
        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </div>

      {/* Details grid skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='h-12 bg-gray-200 rounded-lg'></div>
        ))}
      </div>

      {/* Facilities skeleton */}
      <div className='flex flex-wrap gap-2 mb-6'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='h-6 bg-gray-200 rounded-full w-20'></div>
        ))}
      </div>

      {/* Button skeleton */}
      <div className='flex justify-end'>
        <div className='h-12 bg-gray-200 rounded-lg w-32'></div>
      </div>
    </div>
  );
}
