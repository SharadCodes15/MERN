import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import PartnerRegister from '../pages/auth/PartnerRegister'
import PartnerLogin from '../pages/auth/PartnerLogin'
import Home from '../pages/general/Home';
import Reels from '../pages/general/Reels';
import PartnerDashboard from '../pages/food-partner/PartnerDashboard';
import Profile from '../pages/food-partner/Profile';
import Saved from '../pages/general/Saved';
import Landingpage from '../pages/Landing/Landingpage';
import { CustomerCart } from '../pages/general/CustomerCart';
import { CustomerCartProvider } from '../pages/general/CustomerCartContext';
import { useCustomerCart } from '../pages/general/CustomerCartStore';

function PartnerOnlyRoute() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let active = true;

    axios
      .get('/api/auth/session', { withCredentials: true })
      .then(({ data }) => {
        const role =
          data.role ||
          data.user?.role ||
          data.account?.role ||
          data.userType;

        if (active) {
          setStatus(
            role === 'foodpartner' || role === 'partner'
              ? 'partner'
              : role === 'user'
                ? 'user'
                : 'guest'
          );
        }
      })
      .catch(() => {
        if (active) {
          setStatus('guest');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === 'checking') {
    return null;
  }

  if (status === 'partner') {
    return <PartnerDashboard />;
  }

  return <Navigate to={status === 'user' ? '/home' : '/food-partner/login'} replace />;
}

function AppContent() {
  const { pathname } = useLocation();
  const { isExpanded } = useCustomerCart();
  const isCustomerPage = pathname === '/' || pathname === '/home' || pathname === '/reels' || pathname === '/saved' || pathname === '/landing' || (pathname.startsWith('/food-partner/') && !['/food-partner/login', '/food-partner/register'].includes(pathname));

  return (
    <>
      <div className={`min-h-screen transition-[margin-right] duration-300 ease-in-out ${isCustomerPage && isExpanded ? 'xl:mr-[clamp(280px,28vw,380px)]' : ''}`}>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/food-partner/register" element={<PartnerRegister />} />
          <Route path="/food-partner/login" element={<PartnerLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landingpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-food" element={<PartnerOnlyRoute />} />
          <Route path="/food-partner/:partnerId" element={<Profile />} />
        </Routes>
      </div>
      {isCustomerPage && <CustomerCart />}
    </>
  );
}

const AppRoutes = () => {
  return (
    <Router>
      <CustomerCartProvider>
        <AppContent />
      </CustomerCartProvider>
    </Router>
  )
}

export default AppRoutes