import "./index.scss";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";


// - NOTIFICATION

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Sidebar() {
  const {
    user,
    } = useAuth0();
  const navRef = useRef();

  const {name, picture, givenName, email } = user;

  const closeSidebar = () => {
    navRef.current.classList.toggle("closed");
  };

  const comingSoon = () => {
    toast.success('Coming soon!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  }

  useEffect(() => {
    // viewport width without vertical scrollbar
    const viewport_width = document.documentElement.clientWidth;
    if (viewport_width < 768) {
      navRef.current.classList.add("closed");
    }
  }, []);

  return (
    <div className="sidebar grid" ref={navRef}>
      <div className="sidebar__header">
        <div className="sidebar__header__icon">
          <img
            src={require("../../assets/images/logo-white-2.png")}
            alt="logo"
          />
        </div>
        <div className="sidebar__header__title">DEGRANDE</div>
        <div className="sidebar__header__toggle" onClick={closeSidebar}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.95483 12.9207H21.9548"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.95483 6.92072H21.9548"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.95483 18.9207H21.9548"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="sidebar__content">
        <div>
          <Link to="/dashboard" className="sidebar__content__item">
            <div className="sidebar__content__item__icon">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.42857 9.20636L12.4286 2.20636L21.4286 9.20636V20.2064C21.4286 20.7368 21.2179 21.2455 20.8428 21.6206C20.4677 21.9956 19.959 22.2064 19.4286 22.2064H5.42857C4.89814 22.2064 4.38943 21.9956 4.01436 21.6206C3.63929 21.2455 3.42857 20.7368 3.42857 20.2064V9.20636Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.42857 22.2064V12.2064H15.4286V22.2064"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="sidebar__content__item__title">Home</div>
          </Link>
        </div>
        <div className="sidebar__content__item" onClick={comingSoon}>
          <div className="sidebar__content__item__icon">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.1855 61.5305C47.1712 61.0171 53.1895 61.0171 59.1752 61.5305C62.4484 61.7499 65.6995 62.228 68.8983 62.9603C75.8174 64.3535 80.333 67.1031 82.2267 71.1359C83.7396 74.4865 83.6996 78.3399 82.1174 81.6579C80.1874 85.6908 75.6718 88.4404 68.6434 89.8702C65.4555 90.5879 62.2167 91.0537 58.9567 91.2634C55.3515 91.6666 52.2925 91.6667 49.452 91.6667H48.3231C46.7139 91.4922 45.4941 90.1248 45.4941 88.4954C45.4941 86.866 46.7139 85.4986 48.3231 85.3241L50.8148 85.3236C53.3121 85.2943 55.8249 85.1775 58.3376 84.9575C61.3019 84.7634 64.2477 84.3467 67.1503 83.711C72.1394 82.6111 75.2712 81.0347 76.2544 78.9449C77.0193 77.3464 77.0193 75.4841 76.2544 73.8856C75.2712 71.7592 72.1394 70.1094 67.2596 69.1195C64.3119 68.4538 61.3163 68.0247 58.3012 67.8364C52.6682 67.323 47.0006 67.323 41.3676 67.8364C38.3913 68.0304 35.4334 68.4471 32.5184 69.0829C27.5294 70.1827 24.434 71.7592 23.4144 73.8489C23.0531 74.6426 22.8667 75.5056 22.8681 76.3786C22.8661 77.2635 23.0523 78.1386 23.4144 78.9449C25.1476 81.3281 27.7847 82.8812 30.6976 83.2344L31.1202 83.349C32.0785 83.682 32.8308 84.4622 33.1238 85.4578C33.4587 86.5956 33.1385 87.8265 32.2926 88.653C31.4467 89.4794 30.2149 89.7648 29.0953 89.3936C24.4004 88.623 20.2826 85.8056 17.8427 81.6946C16.2748 78.3649 16.2748 74.5023 17.8427 71.1726C19.7727 67.0298 24.2884 64.3535 31.2439 62.9236C34.5186 62.2105 37.8418 61.7448 41.1855 61.5305ZM41.5197 10.03C49.8114 6.57635 59.3532 8.49329 65.693 14.8864C72.0329 21.2795 73.9213 30.8889 70.4772 39.2308C67.033 47.5727 58.9351 53.0031 49.9618 52.9883C37.7278 52.968 27.8207 42.9777 27.8207 30.6611L27.8413 29.6968C28.2107 21.0516 33.5242 13.3603 41.5197 10.03ZM49.9618 14.7131C45.7542 14.7034 41.7156 16.3793 38.737 19.3712C35.7583 22.3631 34.0843 26.4251 34.0843 30.6611C34.0696 37.1296 37.9287 42.9694 43.8605 45.4551C49.7924 47.9408 56.6275 46.5822 61.176 42.0136C65.7245 37.4449 67.0896 30.5668 64.6342 24.5892C62.1788 18.6117 56.387 14.7131 49.9618 14.7131Z"
                fill="#F2F1F2"
              />
            </svg>
          </div>
          <div className="sidebar__content__item__title">Users</div>
        </div>

        <Link to="categories" className="sidebar__content__item">
          <div className="sidebar__content__item__icon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_156_8)">
                <path
                  d="M21.635 8.26984V21.2698H3.63501V8.26984"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.635 3.26984H1.63501V8.26984H23.635V3.26984Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.635 12.2698H14.635"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_156_8">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.63501 0.269836)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="sidebar__content__item__title">Categories</div>
        </Link>
        <div className="sidebar__content__item" onClick={comingSoon}>
          <div className="sidebar__content__item__icon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.63501 3.26984H8.63501C9.69588 3.26984 10.7133 3.69126 11.4634 4.44141C12.2136 5.19155 12.635 6.20897 12.635 7.26984V21.2698C12.635 20.4742 12.3189 19.7111 11.7563 19.1485C11.1937 18.5859 10.4307 18.2698 9.63501 18.2698H2.63501V3.26984Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.635 3.26984H16.635C15.5741 3.26984 14.5567 3.69126 13.8066 4.44141C13.0564 5.19155 12.635 6.20897 12.635 7.26984V21.2698C12.635 20.4742 12.9511 19.7111 13.5137 19.1485C14.0763 18.5859 14.8394 18.2698 15.635 18.2698H22.635V3.26984Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="sidebar__content__item__title">Reservations</div>
        </div>
        <div className="sidebar__content__item" onClick={comingSoon}>
          <div className="sidebar__content__item__icon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3351 6.56982C15.1519 6.75675 15.0493 7.00806 15.0493 7.26982C15.0493 7.53157 15.1519 7.78289 15.3351 7.96982L16.9351 9.56982C17.122 9.75304 17.3734 9.85567 17.6351 9.85567C17.8969 9.85567 18.1482 9.75304 18.3351 9.56982L22.1051 5.79982C22.6079 6.91101 22.7602 8.14905 22.5416 9.34896C22.3229 10.5489 21.7438 11.6537 20.8814 12.5161C20.019 13.3785 18.9142 13.9576 17.7143 14.1763C16.5143 14.3949 15.2763 14.2427 14.1651 13.7398L7.25511 20.6498C6.85728 21.0476 6.31772 21.2711 5.75511 21.2711C5.1925 21.2711 4.65293 21.0476 4.25511 20.6498C3.85728 20.252 3.63379 19.7124 3.63379 19.1498C3.63379 18.5872 3.85728 18.0476 4.25511 17.6498L11.1651 10.7398C10.6623 9.62863 10.51 8.39058 10.7287 7.19067C10.9473 5.99076 11.5264 4.88597 12.3888 4.02354C13.2513 3.1611 14.3561 2.58199 15.556 2.36336C16.7559 2.14473 17.9939 2.29698 19.1051 2.79982L15.3451 6.55982L15.3351 6.56982Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="sidebar__content__item__title">Roles</div>
        </div>
        <div className="sidebar__content__item" onClick={comingSoon}>
          <div className="sidebar__content__item__icon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6667 4.26984H5.66675C4.56218 4.26984 3.66675 5.16527 3.66675 6.26984V20.2698C3.66675 21.3744 4.56218 22.2698 5.66675 22.2698H19.6667C20.7713 22.2698 21.6667 21.3744 21.6667 20.2698V6.26984C21.6667 5.16527 20.7713 4.26984 19.6667 4.26984Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6667 2.26984V6.26984"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.66675 2.26984V6.26984"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.66675 10.2698H21.6667"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="sidebar__content__item__title">Calendar</div>
        </div>
      </div>
      <div className="sidebar__footer">
        <div className="sidebar__footer__icon">
          <img src={picture} alt={givenName} />
        </div>
        <div className="sidebar__footer__title">
          {name}
          <div className="sidebar__footer__title__sub">{email}</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
