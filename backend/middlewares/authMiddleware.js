import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Clerk ka middleware jo token ko automatically verify karega
export const protect = (req, res, next) => {
  ClerkExpressRequireAuth()(req, res, (err) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Not authorized by Clerk' });
    }
    // Agar sab sahi hai, toh next function (addReview) chal jayega
    next();
  });
};