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

### Homepage

![Homepage](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/home_page.png?raw=true)
_Clean and intuitive homepage with search functionality and featured hotels_

### Hotel Management

![Add Hotel](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/add_hotel_page.jpg?raw=true)
_Comprehensive hotel creation form with type selection and facilities_

![My Hotels](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/my_hotel_page.jpg?raw=true)
_Hotel owner dashboard showing all managed properties_

### Booking System

![Hotel Details](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/hotel_details_page.jpg?raw=true)
_Detailed hotel view with gallery, amenities, and booking form_

![Booking Confirmation](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/checkout_page.jpg?raw=true)
_Secure booking confirmation with payment details_

### Authentication

![Authentication](https://github.com/AhamedSifat/BookLiton/blob/main/client/public/images/login_Signup.jpg?raw=true)
_Clean sign up and login forms_

### Search & Filtering

![Search Results](https://github.com/user/repo/blob/main/search-results.png)
_Advanced search with filters for hotel type, facilities, and price range_

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
