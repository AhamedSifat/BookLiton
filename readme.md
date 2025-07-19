# BookLiton - Hotel Booking Platform

A full-stack hotel booking application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring secure authentication, payment processing, and comprehensive hotel management.

## 🌟 Features

### User Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Hotel Search & Discovery**: Browse and search hotels with advanced filtering
- **Hotel Booking**: Complete booking flow with payment integration
- **Responsive Design**: Mobile-friendly interface

### Admin Features

- **Hotel Management**: Add, edit, and manage hotel listings
- **Image Upload**: Multiple image upload for hotels using Cloudinary
- **Booking Management**: Track and manage all bookings

### Technical Features

- **Secure Authentication**: JWT-based authentication system
- **Payment Processing**: Stripe integration for secure payments
- **Image Management**: Cloudinary integration for image storage
- **Real-time Updates**: TanStack Query for efficient data fetching
- **Form Validation**: Comprehensive input validation
- **Error Handling**: Robust error handling and user feedback

## 🖼️ Application Screenshots

### Homepage - First Impression

![Homepage](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/home_page.png?raw=true)

The homepage serves as the main entry point for users, featuring a modern and responsive design. The interface includes:

- **Hero Section**: Eye-catching banner with search functionality allowing users to find hotels by destination, check-in/check-out dates, and guest count
- **Featured Hotels**: Curated selection of popular hotels displayed in an attractive card layout
- **Quick Search Bar**: Prominent search functionality with date pickers and location autocomplete
- **Navigation Menu**: Clean header with user authentication links and easy access to all major sections
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing experiences

The homepage uses a sophisticated color scheme and typography that creates a professional yet welcoming atmosphere for travelers looking to book their perfect stay.

### Advanced Search & Discovery

![Search Results](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/search_page.jpg?raw=true)

The search functionality transforms hotel discovery into an engaging and efficient experience:

- **Smart Filtering System**: Comprehensive filters including price range, hotel type, amenities, and guest ratings
- **Real-time Results**: Dynamic search results that update instantly as users modify their criteria
- **Sort Options**: Multiple sorting capabilities by price, rating, distance, and popularity
- **Map Integration**: Interactive map view showing hotel locations with pricing overlays
- **Availability Checking**: Real-time availability verification for selected dates and guest counts
- **Comparison Tools**: Side-by-side hotel comparison functionality for informed decision making
- **Saved Searches**: Ability to bookmark searches and set up availability alerts
- **Load More/Pagination**: Efficient result loading with infinite scroll or traditional pagination options

This search system combines powerful filtering capabilities with an intuitive interface, helping users quickly find their ideal accommodation while exploring various options and making informed decisions.

### Hotel Management - Property Creation

![Add Hotel](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/add_hotel_page.jpg?raw=true)

The hotel creation interface empowers property owners with a comprehensive form system:

- **Multi-Step Form**: Intuitive wizard-style form breaking down hotel creation into manageable sections
- **Property Details**: Essential information fields including hotel name, description, and location details
- **Hotel Type Selection**: Dropdown menu with various hotel categories (Luxury, Budget, Boutique, Resort, etc.)
- **Facilities Management**: Interactive checkbox system for amenities like WiFi, Pool, Spa, Gym, and more
- **Image Upload System**: Drag-and-drop interface powered by Cloudinary for multiple high-quality image uploads
- **Pricing Configuration**: Flexible pricing setup with per-night rates and guest capacity settings
- **Real-time Validation**: Instant feedback on form inputs with clear error messaging and success indicators

This interface ensures hotel owners can easily list their properties with all necessary details while maintaining data quality and consistency.

### Hotel Management Dashboard

![My Hotels](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/my_hotel_page.jpg?raw=true)

The property management dashboard provides hotel owners with complete oversight of their listings:

- **Hotel Portfolio Overview**: Grid-based layout displaying all owned properties with key information at a glance
- **Quick Actions**: Edit, view, and manage individual hotels directly from the dashboard
- **Property Status Indicators**: Visual cues showing booking availability and property status
- **Performance Metrics**: Basic analytics showing booking frequency and revenue potential
- **Add New Property**: Prominent call-to-action button for expanding their hotel portfolio
- **Search and Filter**: Tools to quickly locate specific properties within larger portfolios
- **Responsive Cards**: Each hotel displayed in an informative card showing images, pricing, and essential details

This dashboard streamlines property management, allowing owners to efficiently oversee multiple hotels and make quick updates as needed.

### Hotel Details - Guest Experience

![Hotel Details](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/hotel_details_page.jpg?raw=true)

The hotel details page offers a comprehensive view designed to convert browsers into bookers:

- **Image Gallery**: High-resolution photo carousel showcasing the hotel's best features and amenities
- **Detailed Information**: Complete hotel description, location details, and unique selling points
- **Amenities Showcase**: Visual representation of all hotel facilities with intuitive icons
- **Booking Widget**: Integrated booking form with date selection, guest count, and instant availability checking
- **Pricing Display**: Clear, transparent pricing with total cost calculations including taxes and fees
- **Reviews and Ratings**: Social proof section displaying guest feedback and overall satisfaction scores
- **Location Map**: Interactive map showing hotel location and nearby attractions
- **Room Types**: Detailed breakdown of available accommodations with specific amenities and capacity

This page is optimized for conversion, providing all necessary information while maintaining a clean, user-friendly layout that encourages bookings.

### Secure Checkout Process

![Booking Confirmation](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/checkout_page.jpg?raw=true)

The checkout experience prioritizes security and user confidence throughout the payment process:

- **Booking Summary**: Clear breakdown of selected dates, room details, guest information, and total costs
- **Guest Information Form**: Secure collection of traveler details with validation for required fields
- **Stripe Integration**: PCI-compliant payment processing with support for major credit cards and digital wallets
- **Security Indicators**: Visual SSL certificates and security badges to build customer trust
- **Payment Protection**: Encrypted transaction processing with real-time fraud detection
- **Confirmation System**: Instant booking confirmation with email receipts and booking reference numbers
- **Cancellation Policy**: Clear terms and conditions display with flexible cancellation options
- **Mobile Optimization**: Streamlined mobile checkout process with touch-friendly interfaces

The entire checkout flow is designed to minimize cart abandonment while ensuring complete transaction security and user satisfaction.

### User Authentication System

![Authentication](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/login_Signup.jpg?raw=true)

The authentication system provides secure and user-friendly access management:

- **Dual Authentication Modes**: Seamless toggle between login and registration forms on a single interface
- **Form Validation**: Real-time input validation with helpful error messages and success indicators
- **Security Features**: Password strength indicators, secure token generation, and session management
- **User Experience**: Clean, modern design with intuitive form layouts and clear call-to-action buttons
- **Social Integration Ready**: Framework prepared for future social media login integration
- **Password Recovery**: Built-in forgot password functionality with secure reset procedures
- **Registration Process**: Streamlined signup with email verification and welcome messaging
- **Responsive Design**: Fully optimized authentication forms for all device sizes

The authentication system balances security requirements with user convenience, ensuring smooth onboarding while maintaining robust protection of user data.

## 🛠️ Technology Stack

### Frontend

- **React 19**: Modern React with hooks
- **React Router**: Client-side routing
- **TanStack Query**: Server state management
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **React Hook Form**: Form handling and validation

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **Bcrypt**: Password hashing
- **Multer**: File upload handling

### Third-party Services

- **Stripe**: Payment processing
- **Cloudinary**: Image storage and optimization
- **MongoDB Atlas**: Cloud database (optional)

## 📁 Project Structure

### Backend Structure

```
src/
├── config/          # Database and third-party service configurations
├── controllers/     # Route handlers and business logic
├── middleware/      # Authentication and validation middleware
├── models/         # MongoDB/Mongoose schemas
├── routes/         # API route definitions
├── services/       # External service integrations
├── shared/         # Shared utilities and constants
├── utils/          # Helper functions and validators
└── server.ts       # Application entry point
```

### Key Backend Files

- **Authentication Routes**: User registration, login, and token verification
- **Hotel Routes**: CRUD operations for hotel management
- **Booking Routes**: Booking creation and payment processing
- **Middleware**: Token verification and request validation

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd booking-app-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend root:

   ```env
   # Database
   MONGODB_CONNECTION_STRING=mongodb://localhost:27017/booking

   # Authentication
   JWT_SECRET_KEY=your_super_secret_jwt_key_here

   # Frontend URL
   CLIENT_URL=http://localhost:5173

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd booking-app-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend root:

   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3000

   # Stripe Configuration
   VITE_STRIPE_PUB_KEY=pk_test_your_stripe_publishable_key_here
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   Application will run on `http://localhost:5173`

## 🔐 Authentication Flow

1. **User Registration**: Users create accounts with email and password
2. **JWT Token Generation**: Secure tokens generated upon successful authentication
3. **Protected Routes**: Middleware validates tokens for protected endpoints
4. **Token Refresh**: Automatic token validation and refresh handling

## 💳 Payment Integration

The application uses Stripe for secure payment processing:

1. **Payment Intent Creation**: Backend creates payment intents for bookings
2. **Secure Checkout**: Frontend handles secure card input and processing
3. **Booking Confirmation**: Successful payments confirm hotel bookings
4. **Receipt Generation**: Users receive booking confirmations with payment details

## 🏨 Hotel Management

### Hotel Creation

- Multi-step form for adding hotel details
- Image upload with Cloudinary integration
- Hotel type categorization (Luxury, Budget, Business, etc.)
- Facility selection (WiFi, Parking, Spa, etc.)
- Pricing and guest capacity configuration

### Hotel Features

- **Hotel Types**: Budget, Boutique, Luxury, Ski Resort, Business, Family, Romantic, Hiking Resort, Cabin, Beach Resort, Golf Resort, Motel, All Inclusive, Pet Friendly, Self Catering
- **Facilities**: Free WiFi, Parking, Airport Shuttle, Family Rooms, Non-Smoking Rooms, Outdoor Pool, Spa, Fitness Center

## 📱 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-token` - Token verification
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get user details

### Hotels

- `GET /api/hotels/all` - Get all hotels
- `GET /api/hotels/search` - Search hotels with filters
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels/:hotelId/bookings/payment-intent` - Create payment intent
- `POST /api/hotels/:hotelId/bookings` - Create booking

### My Hotels (Protected)

- `POST /api/my-hotels` - Create hotel
- `GET /api/my-hotels` - Get user's hotels
- `GET /api/my-hotels/:id` - Get specific hotel
- `PUT /api/my-hotels/:id` - Update hotel

## 🔧 Configuration

### Database Models

- **User Model**: User authentication and profile data
- **Hotel Model**: Hotel details, amenities, and pricing
- **Booking Model**: Booking information and payment status

### Middleware

- **Authentication Middleware**: JWT token verification
- **Validation Middleware**: Input validation and sanitization
- **File Upload Middleware**: Image upload handling with Multer

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas for production database
2. Configure environment variables for production
3. Deploy to platforms like Heroku, AWS, or DigitalOcean
4. Set up proper CORS policies for production frontend URL

### Frontend Deployment

1. Build the React application: `npm run build`
2. Deploy to Netlify, Vercel, or similar platforms
3. Configure environment variables for production API URL
4. Set up proper routing for SPA

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Stripe for payment processing
- Cloudinary for image management
- MongoDB for database services
- React and Node.js communities for excellent documentation

## 📞 Support

For support, email ahahmedsifat111@gmail.com or join our Slack channel.

---

**Built with ❤️ using the MERN Stack**
