export default function HomeSkeleton() {
  return (
    <div className='space-y-16'>
      {/* Hero Stats Skeleton */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='text-center'>
            <div className='h-8 bg-gray-200 rounded w-16 mx-auto mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-12 mx-auto'></div>
          </div>
        ))}
      </div>

      {/* Featured Hotels Skeleton */}
      <div>
        <div className='text-center mb-12'>
          <div className='h-10 bg-gray-200 rounded w-64 mx-auto mb-4'></div>
          <div className='h-6 bg-gray-200 rounded w-96 mx-auto'></div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse'
            >
              <div className='h-48 bg-gray-200'></div>
              <div className='p-6 space-y-4'>
                <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                <div className='flex justify-between items-center'>
                  <div className='h-8 bg-gray-200 rounded w-20'></div>
                  <div className='h-10 bg-gray-200 rounded w-24'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='text-center animate-pulse'>
            <div className='w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4'></div>
            <div className='h-6 bg-gray-200 rounded w-32 mx-auto mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-48 mx-auto'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
