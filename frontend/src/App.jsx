import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

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

  useEffect(() => {
    const fetchMyToken = async () => {
      const token = await getToken();
      console.log("MERA_ASLI_TOKEN:", token);
    };
    fetchMyToken();
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
        {/* NAYA: AdminLayout ko AdminRoute ke andar wrap kar diya hai */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Ye saare routes ab automatically secure ho gaye! */}
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