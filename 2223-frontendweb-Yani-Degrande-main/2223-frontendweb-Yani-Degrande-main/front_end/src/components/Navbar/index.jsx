import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./index.scss";

import AuthenticationButton from "../authentication/AuthenticationButton";

import useUsers from "../../api/users";

function DashboardButton() {
  const { isAuthenticated, user } = useAuth0();
  const [employee, setEmployee] = useState(false);
  const usersApi = useUsers();

  const getRole = async (auth0Id) => {
    const registratedUser = await usersApi.getByAuth0Id(auth0Id);
    return registratedUser.role_id;
  };

  if (isAuthenticated) {
    getRole(user.sub).then((res) => {
      if (res === "37b7d86b-e11d-44eb-b55d-d8424336d2bc") {
        console.log("Employee logged in successfully!")
        setEmployee(true);
      }
      else {
        setEmployee(false);
      }
    });
  }
  if (employee) {
    return (
      <li className="nav__link">
        <Link id="dashboard" to="/dashboard">
          Dashboard
        </Link>
      </li>
    );
  }
}

export default function Navbar() {
  const navRef = useRef();

  const showNav = () => {
    navRef.current.classList.toggle("show");
  };

  const closeNav = () => {
    navRef.current.classList.remove("show");
  };

  useEffect(() => {
    const active = document.getElementsByClassName("active");

    document.addEventListener("click", (e) => {
      if (e.target.parentNode.className === "nav__link") {
        if (active.length > 0) {
          console.log(active);
          active[0].classList.remove("active");
        }
        e.target.classList.add("active");
      }
    });
  }, []);
  return (
    <div className="navigation grid">
      <ul className="nav" ref={navRef}>
        <li className="nav__link">
          <Link to="/" className="active" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li className="nav__link">
          <Link to="/about" onClick={closeNav}>
            About
          </Link>
        </li>
        <li className="nav__link">
          <Link id="res" to="/reservation" onClick={closeNav}>
            Reservation
          </Link>
        </li>
        <DashboardButton />
      </ul>
      <div className="navigation__auth">
        <AuthenticationButton />
      </div>
      <div className="navigation__burger-menu">
        <button className="burger-menu" onClick={showNav}>
        <svg
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.95483 12.9207H21.9548"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.95483 6.92072H21.9548"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.95483 18.9207H21.9548"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      </div>
    </div>
  );
}
