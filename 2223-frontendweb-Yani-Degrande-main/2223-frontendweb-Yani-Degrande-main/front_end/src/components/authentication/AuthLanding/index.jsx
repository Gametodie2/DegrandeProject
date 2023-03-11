// ========== AUTH LANDING PAGE ==========
// This page is used to display the login page when a user is not yet logged in / displays an error page when the login fails / displays a loading page when the login is in progress


// === Imports ===

// - Auth0
import { useAuth0 } from "@auth0/auth0-react";

// - React
import { Navigate, Link } from "react-router-dom";

// - Components
import Error from "../../Error";
import LoginButton from "../LoginButton";

// - Styles
import "./index.scss";

// === Return Button ===
function ReturnHomeButton() {
  return (
    <button className="return__home">
      <Link to="/">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18.5L9 12.5L15 6.5"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Return Home
      </Link>
    </button>
  );
}

// === Auth Landing Page ===
export default function AuthLanding() {
  const { error, isAuthenticated, isLoading } = useAuth0();

  if (error) {
    <div className="authlanding">
      <ReturnHomeButton />
      <div className="authlanding__title">
        <h1>Login failed</h1>
      </div>
      <div className="authlanding__subtitle">
        <p>
          Sorry, we were unable to sign you in, the error below might be useful.
        </p>
      </div>
      <div className="authlanding__login">
        <Error error={error} />
        <LoginButton />
      </div>
    </div>;
  }

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <div className="authlanding">
        <ReturnHomeButton />
        <div className="authlanding__title">
          <h1>Login required</h1>
        </div>
        <div className="authlanding__subtitle">
          <p>Please log in to access this page.</p>
        </div>
        <div className="authlanding__login">
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="authlanding">
      <ReturnHomeButton />
      <div className="authlanding__title">
        <h1>Signing in</h1>
      </div>
      <div className="authlanding__subtitle">
        <p>Please wait while we sign you in!</p>
      </div>
      <div className="authlanding__login">
        <LoginButton />
      </div>
    </div>
  );
}
