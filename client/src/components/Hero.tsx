import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className='relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 py-16 overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className='relative container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight py-4'>
            Find Your Perfect
            <span className='block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
              Getaway
            </span>
          </h1>
        </div>

        {/* Search Bar */}
        <SearchBar />
      </div>
    </section>
  );
}
