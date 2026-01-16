import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import OtpVerify from './pages/Auth/OtpVerify';
import SelectRole from './pages/Auth/SelectRole';
import Layout from './components/Layout';
import HomePage from './pages/Dashboard/Home';
import Community from './pages/Community';
import Profile from './pages/Profile/Profile';
import SellCrop from './pages/Dashboard/Sell/SellCrop';
import MyCrops from './pages/Dashboard/MyCrops/MyCrops';
import Buyers from './pages/Dashboard/Buyers/Buyers';
import AgroShop from './pages/Dashboard/AgroShop/AgroShop';
import Marketplace from './pages/Dashboard/Farmers/Farmers';
import Favorites from './pages/Dashboard/Favorites/Favorites';
import AddPost from './pages/Community/AddPost';
import EditBasicInfo from './pages/Profile/EditBasicInfo';
import RequirementDetails from './pages/Dashboard/RequirementDetails/RequirementDetails';
import AgroShopDetails from './pages/Dashboard/AgroShopDetails/AgroShopDetails';
import PostRequirement from './pages/Dashboard/PostRequirement/PostRequirement';
import TermsConditions from './pages/CMS/TermsConditions';
import AboutUs from './pages/CMS/AboutUs';
import ContactUs from './pages/CMS/ContactUs';
import Language from './pages/CMS/Language';
import OurServices from './pages/CMS/OurServices';
import Notification from './pages/Notification/Notification';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Auth routes - accessible without authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/select-role" element={<SelectRole />} />

        {/* Main routes - all accessible without authentication but some role protected */}
        <Route path="/" element={<Layout />}>
          {/* Common Routes */}
          <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="add-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="requirement/:id" element={<ProtectedRoute><RequirementDetails /></ProtectedRoute>} />
          <Route path="edit-profile" element={<ProtectedRoute><EditBasicInfo /></ProtectedRoute>} />

          {/* Farmer & FPO Only Routes */}
          <Route
            path="sell"
            element={
              <ProtectedRoute allowedRoles={['FARMER', 'FPO']}>
                <SellCrop />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-crops"
            element={
              <ProtectedRoute allowedRoles={['FARMER', 'FPO']}>
                <MyCrops />
              </ProtectedRoute>
            }
          />
          <Route
            path="buyers"
            element={
              <ProtectedRoute allowedRoles={['FARMER', 'FPO']}>
                <Buyers />
              </ProtectedRoute>
            }
          />

          {/* Buyer & AgroShop Only Routes */}
          {/* Post Requirement - Restricted to Buyers & AgroShops (Matches Mobile App) */}
          <Route
            path="post-requirement"
            element={
              <ProtectedRoute allowedRoles={['BUYER', 'AGROSHOP']}>
                <PostRequirement />
              </ProtectedRoute>
            }
          />

          {/* Marketplace (Farmers) - Visible to Buyers/AgroShops in drawers but technically open */}
          <Route path="marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />

          {/* AgroShop List - Open to all */}
          <Route path="agroshop" element={<ProtectedRoute><AgroShop /></ProtectedRoute>} />
          <Route path="agroshop/:id" element={<ProtectedRoute><AgroShopDetails /></ProtectedRoute>} />


          {/* CMS Pages */}
          {/* CMS Pages - Protected to match Mobile App Drawer availability */}
          <Route path="terms-conditions" element={<ProtectedRoute><TermsConditions /></ProtectedRoute>} />
          <Route path="about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
          <Route path="language" element={<ProtectedRoute><Language /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute><Notification /></ProtectedRoute>} />
          <Route path="our-services" element={<ProtectedRoute><OurServices /></ProtectedRoute>} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
