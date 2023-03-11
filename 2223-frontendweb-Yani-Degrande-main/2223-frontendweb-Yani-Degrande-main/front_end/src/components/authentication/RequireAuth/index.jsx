// ========== Require Auth Component ==========
// Description: This component is used to protect the routes that require authentication. If the user is not authenticated, he will be redirected to the login page.


// === Imports ===

// - Auth0
import { useAuth0 } from '@auth0/auth0-react';
// - React
import { Navigate } from 'react-router';

// - Components
import Loader from '../../Loader';

// === Require Auth ===
export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader loading />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
}