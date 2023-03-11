// =============== Category ===============
// Description: This component is used to display the different ticket types

// === Imports ===

// - React
import { memo } from "react";
import { useFormContext } from "react-hook-form";

// - Styles
import "./index.scss";

// ======== Constants ========

// - price formatter
const priceFormat = new Intl.NumberFormat("nl-BE", {
  currency: "EUR",
  style: "currency",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

// - validation rules
const validationRules = {
  name: {
    required: "this is required",
    minLength: { value: 2, message: "Min length is 2" },
  },
  duration: { required: "this is required" },
  price: {
    valueAsNumber: true,
    required: "this is required",
    min: { value: 1, message: "min 1" },
    max: { value: 5000, message: "max 5000" },
  },
};

// ======== Label Input ========
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
        <div className="form-text text-danger">{errors[name].message}</div>
      ) : null}
    </div>
  );
}

// ======== Category ========
function Category({ name, duration, price }) {
  return (
    <div className="option grid">
      <label for={name}>
        {name}:<br />
        <span>
          {parseInt(duration.slice(0, 2))}.{duration.slice(3, 5)}h || {priceFormat.format(price)}
        </span>
      </label>
      <LabelInput name="ticket" type="radio" value={name} id={name} data-cy={`ticket_type_${name}`}/>
    </div>
  );
}


// ======== Exports ========
export default memo(Category);