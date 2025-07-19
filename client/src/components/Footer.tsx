import { Link } from 'react-router-dom';
import {
  Hotel,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-slate-900 text-white'>
      {/* Newsletter Section */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 py-12'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
          <div className='text-center'>
            <h3 className='text-2xl md:text-3xl font-bold mb-4'>
              Get the Best Travel Deals
            </h3>
            <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
              Subscribe to our newsletter and be the first to know about
              exclusive offers and amazing destinations.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30'
              />
              <button className='bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className='py-16'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Brand */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl'>
                  <Hotel className='h-6 w-6 text-white' />
                </div>
                <span className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  BookLiton
                </span>
              </div>
              <p className='text-slate-400 leading-relaxed'>
                Your trusted partner for unforgettable travel experiences.
                Discover the world with confidence and comfort.
              </p>
              <div className='flex space-x-4'>
                <button className='text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors'>
                  <Facebook className='h-4 w-4' />
                </button>
                <button className='text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors'>
                  <Twitter className='h-4 w-4' />
                </button>
                <button className='text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors'>
                  <Instagram className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold'>Quick Links</h4>
              <div className='space-y-2'>
                <Link
                  to='/about'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  About Us
                </Link>
                <Link
                  to='/destinations'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  Destinations
                </Link>
                <Link
                  to='/hotels'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  Hotels
                </Link>
                <Link
                  to='/contact'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold'>Support</h4>
              <div className='space-y-2'>
                <Link
                  to='/help'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  Help Center
                </Link>
                <Link
                  to='/booking-guide'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  Booking Guide
                </Link>
                <Link
                  to='/cancellation'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  Cancellation Policy
                </Link>
                <Link
                  to='/faq'
                  className='block text-slate-400 hover:text-white transition-colors'
                >
                  FAQ
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold'>Contact Info</h4>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3 text-slate-400'>
                  <Phone className='h-4 w-4' />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className='flex items-center space-x-3 text-slate-400'>
                  <Mail className='h-4 w-4' />
                  <span>support@BookLiton.com</span>
                </div>
                <div className='flex items-start space-x-3 text-slate-400'>
                  <MapPin className='h-4 w-4 mt-1' />
                  <span>
                    123 Travel Street
                    <br />
                    Adventure City, AC 12345
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-slate-800 py-6'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-slate-400 text-sm'>
              © {new Date().getFullYear()} BookLiton. All rights reserved.
            </p>
            <div className='flex space-x-6 text-sm'>
              <Link
                to='/privacy'
                className='text-slate-400 hover:text-white transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                to='/terms'
                className='text-slate-400 hover:text-white transition-colors'
              >
                Terms of Service
              </Link>
              <Link
                to='/cookies'
                className='text-slate-400 hover:text-white transition-colors'
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
