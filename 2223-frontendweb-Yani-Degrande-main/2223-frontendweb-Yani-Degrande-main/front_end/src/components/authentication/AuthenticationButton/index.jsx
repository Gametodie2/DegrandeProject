// ============= Authentication Button =============
// This component is used to display the user's profile picture and dropdown menu.

// === Imports ===

// - Auth0
import { useAuth0 } from "@auth0/auth0-react";
// - React
import { useState } from "react";

// - API
import useUsers from "../../../api/users";

// - components
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

// - Styles
import "./index.scss";


// === Authentication Button ===
export default function AuthenticationButton() {

  // - State
  const [userId, setUserId] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  // - API
  const usersApi = useUsers();

  // === functions ===

  // - Get user id from auth0 id
  const getUserId = async (auth0ID) => { 
    await usersApi.getByAuth0Id(auth0ID).then((user) => {
      setUserId(user.id);
      console.log(userId)
    });
  };
    

  // - Copy user id to clipboard
  const copyToClipBoard = () => {
    let input = document.querySelector(".profile__dropdown__divider__copy-id__copy-text input");
    input.select();

    document.execCommand("copy");
    let copyText = document.querySelector(".profile__dropdown__divider__copy-id__copy-text");
    copyText.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(() => {
      copyText.classList.remove("active");
    }, 2000);
  };

  // - Return
  if (isAuthenticated) {
    const { name, picture, givenName, email, sub } = user;
    getUserId(sub);

    return (
      <div className="profile" data-cy="profile">
        <div className="profile__picture">
          <img src={picture} alt={givenName} />
        </div>
        <div className="profile__dropdown">
          <div className="profile__dropdown__account">
            <div className="profile__dropdown__account__image">
              <img src={picture} alt={givenName} />
            </div>
            <div className="profile__dropdown__account__info">
              <div className="profile__dropdown__account__info__name">
                {name}
              </div>
              <div className="profile__dropdown__account__info__email">
                {email}
              </div>
            </div>
          </div>
          <div className="profile__dropdown__divider">
            <div className="profile__dropdown__divider__copy-id">
              <div className="profile__dropdown__divider__copy-id__copy-text">
                <input type="text" value={userId} />
                <button onClick={copyToClipBoard}>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 9.5H11C9.89543 9.5 9 10.3954 9 11.5V20.5C9 21.6046 9.89543 22.5 11 22.5H20C21.1046 22.5 22 21.6046 22 20.5V11.5C22 10.3954 21.1046 9.5 20 9.5Z"
                      stroke="rgb(240, 240, 240)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 15.5H4C3.46957 15.5 2.96086 15.2893 2.58579 14.9142C2.21071 14.5391 2 14.0304 2 13.5V4.5C2 3.96957 2.21071 3.46086 2.58579 3.08579C2.96086 2.71071 3.46957 2.5 4 2.5H13C13.5304 2.5 14.0391 2.71071 14.4142 3.08579C14.7893 3.46086 15 3.96957 15 4.5V5.5"
                      stroke="rgb(240, 240, 240)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="profile__dropdown__divider__logout">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // return 
  return (
    <div className="login">
      <div className="login__image">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41.1855 61.5305C47.1712 61.0172 53.1895 61.0172 59.1752 61.5305C62.4484 61.7499 65.6995 62.228 68.8983 62.9603C75.8174 64.3535 80.333 67.1031 82.2267 71.1359C83.7396 74.4865 83.6996 78.3399 82.1174 81.6579C80.1874 85.6908 75.6718 88.4404 68.6434 89.8702C65.4555 90.5879 62.2167 91.0537 58.9567 91.2634C55.3515 91.6667 52.2925 91.6667 49.452 91.6667H48.3231C46.7139 91.4922 45.4941 90.1248 45.4941 88.4954C45.4941 86.866 46.7139 85.4986 48.3231 85.3241L50.8148 85.3236C53.3121 85.2944 55.8249 85.1775 58.3376 84.9575C61.3019 84.7634 64.2477 84.3467 67.1503 83.711C72.1394 82.6112 75.2712 81.0347 76.2544 78.945C77.0193 77.3464 77.0193 75.4842 76.2544 73.8856C75.2712 71.7592 72.1394 70.1094 67.2596 69.1195C64.3119 68.4538 61.3163 68.0247 58.3012 67.8364C52.6682 67.323 47.0006 67.323 41.3676 67.8364C38.3913 68.0305 35.4334 68.4471 32.5184 69.0829C27.5294 70.1827 24.434 71.7592 23.4144 73.8489C23.0531 74.6426 22.8667 75.5056 22.8681 76.3786C22.8661 77.2635 23.0523 78.1386 23.4144 78.945C25.1476 81.3281 27.7847 82.8813 30.6976 83.2344L31.1202 83.349C32.0785 83.682 32.8308 84.4622 33.1238 85.4578C33.4587 86.5956 33.1385 87.8265 32.2926 88.653C31.4467 89.4794 30.2149 89.7648 29.0953 89.3936C24.4004 88.623 20.2826 85.8056 17.8427 81.6946C16.2748 78.3649 16.2748 74.5023 17.8427 71.1726C19.7727 67.0298 24.2884 64.3535 31.2439 62.9237C34.5186 62.2105 37.8418 61.7448 41.1855 61.5305ZM41.5197 10.03C49.8114 6.57636 59.3532 8.49331 65.693 14.8864C72.0329 21.2796 73.9213 30.8889 70.4772 39.2308C67.033 47.5727 58.9351 53.0031 49.9618 52.9883C37.7278 52.968 27.8207 42.9778 27.8207 30.6611L27.8413 29.6968C28.2107 21.0516 33.5242 13.3603 41.5197 10.03ZM49.9618 14.7131C45.7542 14.7034 41.7156 16.3793 38.737 19.3712C35.7583 22.3631 34.0843 26.4251 34.0843 30.6611C34.0696 37.1296 37.9287 42.9694 43.8605 45.4551C49.7924 47.9408 56.6275 46.5823 61.176 42.0136C65.7245 37.4449 67.0896 30.5668 64.6342 24.5892C62.1788 18.6117 56.387 14.7131 49.9618 14.7131Z"
            fill="#000"
          />
        </svg>
      </div>
      <div className="login__dropdown">
        <div className="login__dropdown__loginButton">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
