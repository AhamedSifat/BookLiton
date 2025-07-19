import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotel';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import HotelDetails from './pages/HotelDetails';
import Booking from './pages/Booking';
import Home from './pages/Home';

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Layout>{<SignIn />}</Layout>} />
      <Route path='/register' element={<Layout>{<Register />}</Layout>} />
      <Route path='*' element={<Navigate to='/' />} />

      {isLoggedIn && (
        <>
          <Route path='/add-hotel' element={<Layout>{<AddHotel />}</Layout>} />
          <Route
            path='/my-hotels'
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />

          <Route
            path='/edit-hotel/:hotelId'
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />

          <Route
            path='/hotel/:hotelId/booking'
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
        </>
      )}

      <Route
        path='/search'
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path='/detail/:hotelId'
        element={
          <Layout>
            <HotelDetails />
          </Layout>
        }
      />
    </Routes>
  );
};
export default App;
