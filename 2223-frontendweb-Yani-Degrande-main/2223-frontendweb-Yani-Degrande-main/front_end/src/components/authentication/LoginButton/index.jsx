// ======= LOGIN BUTTON =======
// This component is used to login the user on the application.

// === Imports ===

// - Auth0
import { useAuth0 } from "@auth0/auth0-react";
// - React
import { useCallback } from "react";

// - Styles
import "./index.scss";

// === Component ===
function LoginButton() {

  // - Auth0
  const { loginWithRedirect } = useAuth0();

  // === Functions ===

  // - Login
  const handleLogin = useCallback(async () => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  // - return
  return (
    <button type="button" className="loginButton" onClick={handleLogin}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 3.5H19C19.5304 3.5 20.0391 3.71071 20.4142 4.08579C20.7893 4.46086 21 4.96957 21 5.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H15"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 17.5L15 12.5L10 7.5"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 12.5H3"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Log In
    </button>
  );
}

// === Exports ===
export default LoginButton;
