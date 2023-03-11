//==============Imports================
//- SCSS

import "./index.scss";

//- React

import { useState, useCallback, useEffect } from "react";

//- Components

import Category from "./Category";
import Error from "../Error";
import Loader from "../Loader";
import Modal from "../modal";

//- API

import useCategories from "../../api/categories";
import { createContext } from "react";


//==============Functions================

//-Category List
function CategoriesList({ categories, onEdit, onDelete, orderBy }) {
  if (categories.length === 0) {
    return <div className="alert alert-info">There are no Categories yet.</div>;
  }
  return (
    <div className="categories__body__list__body " data-cy="category_list">
      {categories
        .sort((a, b) => {
          if (orderBy === "name") {
            return a.name.localeCompare(b.name);
          }
          if (orderBy === "duration") {
            return a.duration.localeCompare(b.duration);
          }
          if (orderBy === "price") {
            return a.price - b.price;
          }
          return null;
        })
        .map((category) => (
          <Category
            key={category.name}
            name={category.name}
            duration={category.duration}
            price={category.price}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
}

//- Categories
export default function Categories() {
  //- API
  const categoriesApi = useCategories();

  //- States
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("name");
  const [modalData, setModalData] = useState({});
  const [type, setType] = useState("Add");

  //- Variables
  const selectOrderBy = document.getElementById("orderBy");

  //- Functions
  if (selectOrderBy) {
    selectOrderBy.addEventListener("change", (event) => {
      setOrderBy(event.target.value);
    });
  }

  const refreshCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setCategories(await categoriesApi.getAll());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ======== Handlers ========

  //- Delete
  const handleDelete = useCallback(async (nameToDelete) => {
    try {
      setError(null);
      await categoriesApi.deleteByName(nameToDelete);

      setCategories((oldCategories) =>
        oldCategories.filter(({ name }) => name !== nameToDelete)
      );
    } catch (err) {
      setError(err);
    }
  }, []);


  //- Save

  const handleSave = useCallback(async (category) => {
    try {
      if (category) {
        setType("Edit");
      }
      if (!category) {
        if (categories.length === 5) {
          throw new Error("You can't add more than 5 categories.");
        }
      }
      console.log(category);
      setError(null);
      setModalData(category);
      setIsOpen(true);
      setLoading(true);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  //- Use Effects
  useEffect(() => {
    refreshCategories();
  }, [refreshCategories, isOpen]);

  return (
    <div className="categories grid">
      <div className="categories__header">
        <div className="categories__header__icon">
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
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M23.635 3.26984H1.63501V8.26984H23.635V3.26984Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.635 12.2698H14.635"
                stroke="black"
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
                  fill="black"
                  transform="translate(0.63501 0.269836)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="categories__header__title">Categories</div>
      </div>
      <div className="categories__body grid">
        <div className="categories__body__header">
          <div className="categories__body__header__search">
            <div className="categories__body__header__search__order-by">
              <select id="orderBy" name="orderby" required data-cy="categories_order-by">
                <option value="name" selected>
                  name
                </option>
                <option value="duration">duration</option>
                <option value="price">price</option>
              </select>
            </div>
            <div
              className="categories__body__header__search__refresh"
              onClick={refreshCategories}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_160_2)">
                  <path
                    d="M1.66675 4.26984V10.2698H7.66675"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.6667 20.2698V14.2698H17.6667"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.1567 9.26985C20.6496 7.83664 19.7876 6.55525 18.6513 5.54527C17.5149 4.53528 16.1413 3.82962 14.6585 3.49411C13.1756 3.1586 11.632 3.20419 10.1716 3.62662C8.71112 4.04906 7.3815 4.83456 6.30675 5.90985L1.66675 10.2699M23.6667 14.2699L19.0267 18.6299C17.952 19.7051 16.6224 20.4906 15.1619 20.9131C13.7015 21.3355 12.1579 21.3811 10.675 21.0456C9.19221 20.7101 7.81855 20.0044 6.68221 18.9944C5.54588 17.9844 4.68392 16.7031 4.17675 15.2699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_160_2">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.666748 0.269836)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div
            className="categories__body__header__add" data-cy="categories_add"
            onClick={() => {
              handleSave();
              setType("Add");
            }}
          >
            <div className="categories__body__header__add__icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8H8V13C8 13.55 7.55 14 7 14C6.45 14 6 13.55 6 13V8H1C0.45 8 0 7.55 0 7C0 6.45 0.45 6 1 6H6V1C6 0.45 6.45 0 7 0C7.55 0 8 0.45 8 1V6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="categories__body__header__add__title">Add</div>
          </div>
        </div>
        <div className="categories__body__list grid">
          <div className="categories__body__list__header grid">
            <div className="categories__body__list__header__name">Name</div>
            <div className="categories__body__list__header__duration">
              Duration
            </div>
            <div className="categories__body__list__header__price">Price</div>
            <div className="categories__body__list__header__actions">
              Actions
            </div>
          </div>
          <Loader loading={loading} />
          <Error error={error} />
          {!loading && !error ? (
            <CategoriesList
              categories={categories}
              onEdit={handleSave}
              onDelete={handleDelete}
              orderBy={orderBy}
            />
          ) : null}
        </div>
      </div>
      {isOpen && (
        <Modal modalData={modalData} type={type} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
