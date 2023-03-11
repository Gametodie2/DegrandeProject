// - COMPONENTS

import Category from "./Category";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

// - API

import useCategories from "../../api/categories";
import useReservations from "../../api/reservations";
import useUsers from "../../api/users";

// - STYLES

import "./index.scss";

// - REACT

import { useState, useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

// - NOTIFICATION

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

// - AUTHENTICATION
import { useAuth0 } from '@auth0/auth0-react';

// - VALIDATION RULES
const today = new Date().toLocaleString();
const year = (today.split(" ")[0]).split("-")[2];
const month = (today.split(" ")[0]).split("-")[1];
const day = (today.split(" ")[0]).split("-")[0];

const validationRules = {
  people: {
    valueAsNumber: true,
    required: "This is required!",
    min: { value: 1, message: "min 1" },
    max: { value: 20, message: "max 20" },
  },
  date: {
    required: "This is required!",
    min: { value: year + "-" + month + "-" + day + "T" + today.split(" ")[1], message: "Date must be in the future" },
  },
  ticket: {
    required: "This is required!",
  }
};

// ================= LABEL INPUT =================

function LabelInput({ name, type, placeholder, ...rest }) {
  const { register, errors, isSubmitting } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="label__content__input">
      <input
        {...register(name, validationRules[name])}
        id={name}
        type={type}
        placeholder={placeholder}
        className="form-control"
        disabled={isSubmitting}
        {...rest}
      />
      {hasError ? (
        <div className="form__error-container">
          <img src={require('../../assets/gifs/1140-error-outline.gif')} alt="error" />
          <div className="form__error" data-cy="labelinput-error">{errors[name].message}</div>
          </div>
      ) : null}
    </div>
  );
}

// ================= CATEGORIES LIST =================
function CategoriesList({ categories }) {
  if (categories.length === 0) {
    return <div className="alert alert-info">There are no Categories yet.</div>;
  }
  return (
    <div className="options">
      {categories.map((category) => (
        <div>
          <Category key={category.name} {...category} />
        </div>
      ))}
    </div>
  );
}

// ================= RESERVATIONS =================
export default function Reservations() {
  // - STATES
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // - FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  // - API
  const categoriesApi = useCategories();
  const reservationsApi = useReservations();
  const usersApi = useUsers();

  // - AUTHENTICATION
  const { user } = useAuth0();

  // - FUNCTIONS
  const refreshCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = async (data) => {
    const { people, date, ticket } = data;
    const registratedUser = await usersApi.getByAuth0Id(user.sub);
    const user_id = registratedUser.id;
    const email = user.email;

    try {
      setLoading(true);
      setError(null);
      await reservationsApi.create({ date, amount: people, user_id, category_name: ticket, email });
      reset();
      navigate("/reservation");
      toast.success('Reservation created successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // - USE EFFECT
  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  // - RENDER
  return (
    <div className="reservation">
      <div className="reservation__image">
        <img
          className="lou-img"
          src={require("../../assets/images/baby_lou.webp")}
          alt="baby_lou.webp"
        />
      </div>
      <div className="reservation__data">
        <div className="title">
          <svg
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.375 22.5H35.625"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.5 9.375L35.625 22.5L22.5 35.625"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h2>RESERVATION</h2>
        </div>
        <div className="form">
          <FormProvider {...{ register, handleSubmit, errors }}>
            <form className="grid" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__group">
                <div>
                  <label for="people">People:</label>
                  <br />
                  <LabelInput
                    name="people"
                    type="number"
                    placeholder="1"
                    min="1"
                    max="20"
                    data-cy="people_input"
                  />
                </div>
                <div>
                  <label for="date">Date:</label>
                  <br />
                  <LabelInput name="date" type="datetime-local" id="date" data-cy="date_input"/>
                </div>
              </div>
              <div>
                <label className="tickets">Ticket type:</label>
                <Loader loading={loading} />
                <Error error={error}/>
                <div className="options">
                  {!loading && !error ? (
                    <CategoriesList categories={categories} />
                  ) : null}
                  </div>
              </div>
              <div className="maps">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2502.604372310247!2d4.162712115738204!3d51.15264637957834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c38c2e75118813%3A0x9d7817017f89f01f!2sDestelwijk%20127%2C%209100%20Sint-Niklaas!5e0!3m2!1snl!2sbe!4v1667688982157!5m2!1snl!2sbe"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              </div>
              <input type="submit"  disabled={isSubmitting} value="BOOK" data-cy="submit_reservation"/>
            </form>
          </FormProvider>
        </div>
      </div>
      <ToastContainer data-cy="reservation_success"/>
    </div>
  );
}
