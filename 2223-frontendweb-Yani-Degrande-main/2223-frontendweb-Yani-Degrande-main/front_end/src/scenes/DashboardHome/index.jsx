//- SCSS

import "./index.scss";

//- React

import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

//- Components

import Error from "../../components/Error";
import Loader from "../../components/Loader";

//- API

import useUsers from "../../api/users";
import useReservations from "../../api/reservations";

//- function
export default function DashboardHome() {
  const [amountOfUsers, setAmountOfUsers] = useState([]);
  const [amountOfReservations, setAmountOfReservations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const usersApi = useUsers();
  const reservationsApi = useReservations();

  // - functions
  const wrapper = document.getElementById("bubble-wrapper");    
    
  const animateBubble = x => {
    const bubble = document.createElement('div');

    bubble.className = `bubble`;

    bubble.style.left = `${x}px`;

    wrapper.appendChild(bubble);

    setTimeout(() => wrapper.removeChild(bubble), 2000);
  }

  window.onmousemove = e => animateBubble(e.clientX);

  const getCountReservAndUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setAmountOfReservations(await reservationsApi.getCount());
      setAmountOfUsers(await usersApi.getCount());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCountReservAndUsers();
  }, [getCountReservAndUsers]);

  // - return

  return (
    <div className="dashboard-home grid">
      <div className="dashboard-home__header">
        <h1 className="dashboard-home__header__title">Dashboard</h1>
      </div>
      <div className="dashboard-home__body grid">
        <div className="dashboard-home__body__header">
          <h2 className="dashboard-home__body__header__title">Overview</h2>
        </div>
        <div className="dashboard-home__body__content">
          <div className="dashboard-home__body__content__list">
            <Link to="/" className="dashboard-home__body__content__list__item">
              <div className="dashboard-home__body__content__list__item__title">
                Home
              </div>
              <div className="dashboard-home__body__content__list__item__icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.42857 9.20636L12.4286 2.20636L21.4286 9.20636V20.2064C21.4286 20.7368 21.2179 21.2455 20.8428 21.6206C20.4677 21.9956 19.959 22.2064 19.4286 22.2064H5.42857C4.89814 22.2064 4.38943 21.9956 4.01436 21.6206C3.63929 21.2455 3.42857 20.7368 3.42857 20.2064V9.20636Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.42857 22.2064V12.2064H15.4286V22.2064"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </Link>
            <div className="dashboard-home__body__content__list__item">
              <div className="dashboard-home__body__content__list__item__title">
                Users
              </div>
              <div className="dashboard-home__body__content__list__item__info">
                <Loader loading={loading} />
                <Error error={error} />
                {!loading && !error ? (amountOfUsers) : null}
              </div>
            </div>
            <div className="dashboard-home__body__content__list__item">
              <div className="dashboard-home__body__content__list__item__title">
                Reservations
              </div>
              <div className="dashboard-home__body__content__list__item__info" data-cy="reservations_amount">
                <Loader loading={loading} />
                <Error error={error} />
                {!loading && !error ? (amountOfReservations) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="bubble-wrapper">
      </div>
    </div>
  );
}
