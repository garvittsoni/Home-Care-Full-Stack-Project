import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AdminRoute = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  // YAHAN APNI AUR APNE BAAKI ADMINS KI EMAIL DAAL DO
  const allowedAdmins = [
    "yashvender720@gmail.com", // Ise apni asli email se replace karo
    "garvitfr@gmail.com"
  ];

  // Jab tak Clerk check kar raha hai, tab tak loading dikhao
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Agar user login hi nahi hai, toh usko Home page par bhej do
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // Current user ki email nikalo
  const currentUserEmail = user?.primaryEmailAddress?.emailAddress;

  // Agar email list mein nahi hai, toh wapas Home par bhej do
  if (!allowedAdmins.includes(currentUserEmail)) {
    return <Navigate to="/" replace />;
  }

  // Agar sab theek hai, toh usko Admin page dekhne do
  return children;
};

export default AdminRoute;
