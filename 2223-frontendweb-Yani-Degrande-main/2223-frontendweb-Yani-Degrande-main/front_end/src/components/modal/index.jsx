import React from "react";
import "./index.scss";
import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useCategories from "../../api/categories";

import Error from "../Error";
import Loader from "../Loader";

const validationRules = {
  name: {
    required: "This is required!",
    minLength: { value: 2, message: "Min length is 2" },
  },
  duration: {
    required: "This is required!",
  },
  price: {
    valueAsNumber: true,
    required: "This is required!",
    min: { value: 1, message: "min 1" },
    max: { value: 5000, message: "max 5000" },
  },
};

function LabelInput({ name, type, placeholder, ...rest }) {
  const { register, errors, isSubmitting } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="modal__content__input">
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
        <div className="modal__error" data-cy="modal_error">{errors[name].message}</div>
      ) : null}
    </div>
  );
}

const Modal = ({type, modalData, setIsOpen }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const categoriesApi = useCategories();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { name } = useParams();


  const onSubmit = async (data) => {
    const { name, duration, price } = data;
    try {
      setLoading(true);
      setError(null);
      await categoriesApi.save({
        id: modalData,
        name: name,
        duration: duration,
        price: price,
      });
      setIsOpen(false);
      navigate("/dashboard/categories");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!name) {
      reset();
      return;
    }
    const fetchCategory = async () => {
      try {
        setError(null);
        const category = await categoriesApi.getByName(name);
        setValue("name", category.name);
        setValue("duration", category.duration);
        setValue("price", category.price);
      } catch (err) {
        setError(err);
      }
    };

    fetchCategory();
  }, [name, setValue, reset]);

  return (
    <>
      <div className="darkBg">
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="heading">{type === 'Edit' ? `Edit ${modalData}`: "Add Category"}</h5>
            </div>
            <button
              type="button"
              className="closeBtn"
              onClick={() => setIsOpen(false)}
            >
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              <FormProvider {...{ register, handleSubmit, errors }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {type === 'Edit' ? null : <div className="form-group">
                    <LabelInput
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      data-cy="categoryName"
                    />
                  </div>}
                  <div className="form-group">
                    <LabelInput
                      name="duration"
                      type="time"
                      data-cy="categoryDuration"
                    />
                  </div>
                  <div className="form-group">
                    <LabelInput
                      name="price"
                      type="text"
                      placeholder="Enter price"
                      data-cy="categoryPrice"
                    />
                  </div>
                  <div className="modalActions">
                    <div className="actionsContainer">
                      <button type="submit" disabled={isSubmitting} data-cy="categorySave">
                        Save
                      </button>
                      <button
                        className="cancelBtn"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <Loader loading={loading} />
      <Error error={error} />
    </>
  );
};

export default Modal;
