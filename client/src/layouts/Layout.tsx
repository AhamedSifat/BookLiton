import { matchPath, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const isRegistrationPage =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/my-hotels' ||
    location.pathname === '/add-hotel' ||
    matchPath('/detail/:id', location.pathname) ||
    matchPath('/edit-hotel/:id', location.pathname) ||
    matchPath('/hotel/:id/booking', location.pathname);

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      <Header />

      {/* Hero only shows if NOT on /registration path */}
      {!isRegistrationPage && <Hero />}

      <div
        className={`flex-1 container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 ${
          isRegistrationPage ? 'py-4' : 'py-12'
        }`}
      >
        {/* Main content area */}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
