import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import PartnerRegister from '../pages/auth/PartnerRegister'
import PartnerLogin from '../pages/auth/PartnerLogin'
import Home from '../pages/general/Home';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import Saved from '../pages/general/Saved';
import Landingpage from '../pages/Landing/Landingpage';

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
    return <CreateFood />;
  }

  return <Navigate to={status === 'user' ? '/home' : '/food-partner/login'} replace />;
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/create-food" element={<PartnerOnlyRoute />} />
        <Route path="/food-partner/:partnerId" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes