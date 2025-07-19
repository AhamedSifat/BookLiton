import mongoose from 'mongoose';
import Hotel from '../models/hotel.model';

// Replace with your MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/booking';

const fakeHotels = [
  {
    userId: '60d5ecb54b24a1001c8e4c1a',
    name: 'Grand Palace Hotel',
    city: 'New York',
    country: 'USA',
    description:
      'A luxurious hotel in the heart of Manhattan with stunning city views and world-class amenities.',
    type: 'Luxury',
    adultCount: 4,
    childCount: 2,
    facilities: [
      'Free WiFi',
      'Parking',
      'Airport Shuttle',
      'Family Rooms',
      'Non-Smoking Rooms',
    ],
    pricePerNight: 299,
    starRating: 5,
    imageUrls: [
      '/images/hotel1-1.jpg',
      '/images/hotel1-2.jpg',
      '/images/hotel1-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c1b',
    name: 'Seaside Resort & Spa',
    city: 'Miami',
    country: 'USA',
    description:
      'Beachfront resort with private beach access, full-service spa, and multiple dining options.',
    type: 'Resort',
    adultCount: 6,
    childCount: 3,
    facilities: ['Beach Access', 'Spa', 'Pool', 'Restaurant', 'Bar'],
    pricePerNight: 450,
    starRating: 4,
    imageUrls: [
      '/images/hotel2-1.jpg',
      '/images/hotel2-2.jpg',
      '/images/hotel2-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c1c',
    name: 'Mountain View Lodge',
    city: 'Denver',
    country: 'USA',
    description:
      'Cozy mountain lodge perfect for outdoor enthusiasts with hiking trails and ski access.',
    type: 'Lodge',
    adultCount: 8,
    childCount: 4,
    facilities: [
      'Ski Access',
      'Hiking Trails',
      'Fireplace',
      'Mountain Views',
      'Pet Friendly',
    ],
    pricePerNight: 180,
    starRating: 3,
    imageUrls: [
      '/images/hotel3-1.jpg',
      '/images/hotel3-2.jpg',
      '/images/hotel3-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c1d',
    name: 'Historic Downtown Inn',
    city: 'Boston',
    country: 'USA',
    description:
      'Charming historic inn located in downtown Boston, walking distance to major attractions.',
    type: 'Boutique',
    adultCount: 2,
    childCount: 1,
    facilities: [
      'Free WiFi',
      'Historic Building',
      'City Center',
      'Restaurant',
      'Business Center',
    ],
    pricePerNight: 220,
    starRating: 4,
    imageUrls: [
      '/images/hotel4-1.jpg',
      '/images/hotel4-2.jpg',
      '/images/hotel4-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c1e',
    name: 'Desert Oasis Resort',
    city: 'Phoenix',
    country: 'USA',
    description:
      'Stunning desert resort with championship golf course and award-winning spa facilities.',
    type: 'Resort',
    adultCount: 4,
    childCount: 2,
    facilities: ['Golf Course', 'Spa', 'Pool', 'Tennis Court', 'Desert Tours'],
    pricePerNight: 320,
    starRating: 5,
    imageUrls: [
      '/images/hotel5-1.jpg',
      '/images/hotel5-2.jpg',
      '/images/hotel5-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c1f',
    name: 'City Center Business Hotel',
    city: 'Chicago',
    country: 'USA',
    description:
      'Modern business hotel with state-of-the-art conference facilities and executive suites.',
    type: 'Business',
    adultCount: 2,
    childCount: 0,
    facilities: [
      'Business Center',
      'Conference Rooms',
      'Free WiFi',
      'Fitness Center',
      'Airport Shuttle',
    ],
    pricePerNight: 195,
    starRating: 4,
    imageUrls: [
      '/images/hotel6-1.jpg',
      '/images/hotel6-2.jpg',
      '/images/hotel6-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c20',
    name: 'Coastal Boutique Hotel',
    city: 'San Francisco',
    country: 'USA',
    description:
      'Elegant boutique hotel with panoramic bay views and artisanal dining experiences.',
    type: 'Boutique',
    adultCount: 3,
    childCount: 1,
    facilities: [
      'Bay Views',
      'Fine Dining',
      'Rooftop Bar',
      'Concierge Service',
      'Valet Parking',
    ],
    pricePerNight: 380,
    starRating: 5,
    imageUrls: [
      '/images/hotel7-1.jpg',
      '/images/hotel7-2.jpg',
      '/images/hotel7-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c21',
    name: 'Garden Inn & Suites',
    city: 'Portland',
    country: 'USA',
    description:
      'Peaceful garden setting with eco-friendly amenities and farm-to-table dining.',
    type: 'Eco-Friendly',
    adultCount: 4,
    childCount: 3,
    facilities: [
      'Garden Views',
      'Eco-Friendly',
      'Farm-to-Table',
      'Bike Rentals',
      'Organic Spa',
    ],
    pricePerNight: 165,
    starRating: 3,
    imageUrls: [
      '/images/hotel8-1.jpg',
      '/images/hotel8-2.jpg',
      '/images/hotel8-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c22',
    name: 'Lakefront Resort Hotel',
    city: 'Orlando',
    country: 'USA',
    description:
      'Family-friendly lakefront resort with water sports and theme park shuttle service.',
    type: 'Family Resort',
    adultCount: 6,
    childCount: 4,
    facilities: [
      'Lake Access',
      'Water Sports',
      'Kids Club',
      'Theme Park Shuttle',
      'Family Rooms',
    ],
    pricePerNight: 275,
    starRating: 4,
    imageUrls: [
      '/images/hotel9-1.jpg',
      '/images/hotel9-2.jpg',
      '/images/hotel9-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c23',
    name: 'Urban Loft Hotel',
    city: 'Seattle',
    country: 'USA',
    description:
      'Contemporary loft-style accommodations in the trendy Capitol Hill district.',
    type: 'Modern',
    adultCount: 2,
    childCount: 0,
    facilities: [
      'Modern Design',
      'City Views',
      'Fitness Center',
      'Coffee Bar',
      'Pet Friendly',
    ],
    pricePerNight: 210,
    starRating: 4,
    imageUrls: [
      '/images/hotel10-1.jpg',
      '/images/hotel10-2.jpg',
      '/images/hotel10-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c24',
    name: 'Royal Castle Hotel',
    city: 'Las Vegas',
    country: 'USA',
    description:
      'Opulent casino hotel with world-class entertainment and luxury shopping.',
    type: 'Casino Hotel',
    adultCount: 4,
    childCount: 0,
    facilities: [
      'Casino',
      'Entertainment Shows',
      'Luxury Shopping',
      'Multiple Restaurants',
      'Spa',
    ],
    pricePerNight: 425,
    starRating: 5,
    imageUrls: [
      '/images/hotel11-1.jpg',
      '/images/hotel11-2.jpg',
      '/images/hotel11-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c25',
    name: 'Countryside B&B',
    city: 'Nashville',
    country: 'USA',
    description:
      'Charming bed and breakfast in the heart of Music City with southern hospitality.',
    type: 'Bed & Breakfast',
    adultCount: 4,
    childCount: 2,
    facilities: [
      'Complimentary Breakfast',
      'Music Venue Access',
      'Southern Cuisine',
      'Historic Charm',
      'Live Music',
    ],
    pricePerNight: 145,
    starRating: 3,
    imageUrls: [
      '/images/hotel12-1.jpg',
      '/images/hotel12-2.jpg',
      '/images/hotel12-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c26',
    name: 'Skyline Tower Hotel',
    city: 'Atlanta',
    country: 'USA',
    description:
      'High-rise hotel with spectacular city skyline views and rooftop dining.',
    type: 'High-rise',
    adultCount: 3,
    childCount: 1,
    facilities: [
      'Skyline Views',
      'Rooftop Restaurant',
      'Pool Deck',
      'Business Center',
      'Valet Service',
    ],
    pricePerNight: 255,
    starRating: 4,
    imageUrls: [
      '/images/hotel13-1.jpg',
      '/images/hotel13-2.jpg',
      '/images/hotel13-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c27',
    name: 'Riverside Inn',
    city: 'Austin',
    country: 'USA',
    description:
      'Relaxing riverside location with kayak rentals and outdoor dining pavilion.',
    type: 'Riverside',
    adultCount: 5,
    childCount: 3,
    facilities: [
      'River Access',
      'Kayak Rentals',
      'Outdoor Dining',
      'Fishing',
      'Nature Trails',
    ],
    pricePerNight: 185,
    starRating: 3,
    imageUrls: [
      '/images/hotel14-1.jpg',
      '/images/hotel14-2.jpg',
      '/images/hotel14-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
  {
    userId: '60d5ecb54b24a1001c8e4c28',
    name: 'Metropolitan Suites',
    city: 'Washington DC',
    country: 'USA',
    description:
      'Sophisticated suites near national monuments with concierge and business services.',
    type: 'Suites',
    adultCount: 4,
    childCount: 2,
    facilities: [
      'Monument Views',
      'Suites',
      'Concierge',
      'Business Services',
      'Metro Access',
    ],
    pricePerNight: 310,
    starRating: 4,
    imageUrls: [
      '/images/hotel15-1.jpg',
      '/images/hotel15-2.jpg',
      '/images/hotel15-3.jpg',
    ],
    lastUpdated: new Date(),
    bookings: [],
  },
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');

    console.log('🧹 Clearing existing hotel data...');
    await Hotel.deleteMany({});
    console.log('✅ Existing data cleared');

    console.log('🌱 Seeding database with fake hotel data...');
    const insertedHotels = await Hotel.insertMany(fakeHotels);
    console.log(`✅ Successfully inserted ${insertedHotels.length} hotels`);

    console.log('📊 Database seeding completed!');
    console.log('Hotels added:');
    insertedHotels.forEach((hotel, index) => {
      console.log(
        `${index + 1}. ${hotel.name} - ${hotel.city}, ${hotel.country} ($${hotel.pricePerNight}/night)`
      );
    });
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    console.log('🔌 Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();
