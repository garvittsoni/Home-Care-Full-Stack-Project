import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

// AOS Library & Styles
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from "./pages/Home";
import ProviderProfile from "./pages/ProviderProfile";
import SubCategory from './pages/SubCategory';
import WorkerList from './pages/WorkerList';
import PartnerRegistration from './pages/PartnerRegistration';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import Categories from './components/Admin/Categories';
import Services from './components/Admin/Services';
import PartnerRequests from './components/Admin/PartnerRequests';
import Reviews from './components/Admin/Reviews';
import AdminRoute from './components/AdminRoute';
import Team from './components/Team';
import EditProfile from './pages/EditProfile';

function App() {
  const { getToken } = useAuth();

  // Clerk Token Fetch
  useEffect(() => {
    const fetchMyToken = async () => {
      const token = await getToken();
      console.log("MERA_ASLI_TOKEN:", token);
    };
    fetchMyToken();
  }, []);

  // AOS Initialize
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in ms
      easing: 'ease-in-out', // Smooth animation curve
      once: true, // Whether animation should happen only once while scrolling down
    });
  }, []);
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/subcategory/:slug/*" element={<SubCategory />} />
        <Route path='/workers/:serviceId' element={<WorkerList />} />
        <Route path='/provider-profile/:providerId' element={<ProviderProfile />} />
        <Route path='/PartnerRegistration' element={<PartnerRegistration />} />
        <Route path='/edit-profile/:id' element={<EditProfile />} />
        <Route path='/team' element={<Team />} /> 
        
        {/* === PROTECTED ADMIN ROUTES (Sirf allowed emails wale) === */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="services" element={<Services />} />
          <Route path="partner-requests" element={<PartnerRequests />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;