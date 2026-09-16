import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../components/UserRegister'
import UserLogin from '../components/UserLogin'
import PartnerRegister from '../components/PartnerRegister'
import PartnerLogin from '../components/PartnerLogin'
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes