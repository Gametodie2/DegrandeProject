import { memo, useCallback} from "react";
import "./index.scss";


const priceFormat = new Intl.NumberFormat("nl-BE", {
  currency: "EUR",
  style: "currency",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function Category({ name, duration, price, onDelete, onEdit }) {
  
  const handleDelete = useCallback(
    (event) => {
      event.preventDefault();
      onDelete(name);
    },
    [name, onDelete]
  );

  const handleEdit = useCallback(
    (event) => {
      event.preventDefault();
      onEdit(name);
    },
    [name, onEdit]
  );

  return (
    <div className="category grid">
      <div className="category__name" data-cy="category_name">{name}</div>
      <div className="category__duration"data-cy="category_duration">{duration}</div>
      <div className="category__price" data-cy="category_price">{priceFormat.format(price)}</div>
      <div className="category__actions">
        <button
          className="category__actions__edit"
          onClick={handleEdit}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.635 3.26983C17.8977 3.00719 18.2095 2.79885 18.5526 2.65671C18.8958 2.51457 19.2636 2.44141 19.635 2.44141C20.0064 2.44141 20.3742 2.51457 20.7174 2.65671C21.0606 2.79885 21.3724 3.00719 21.635 3.26983C21.8977 3.53248 22.106 3.84428 22.2481 4.18744C22.3903 4.5306 22.4634 4.8984 22.4634 5.26983C22.4634 5.64127 22.3903 6.00906 22.2481 6.35223C22.106 6.69539 21.8977 7.00719 21.635 7.26983L8.13501 20.7698L2.63501 22.2698L4.13501 16.7698L17.635 3.26983Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="category__actions__delete" onClick={handleDelete}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.63501 6.26984H5.63501H21.635"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.635 6.26984V20.2698C19.635 20.8003 19.4243 21.309 19.0492 21.684C18.6742 22.0591 18.1654 22.2698 17.635 22.2698H7.63501C7.10458 22.2698 6.59587 22.0591 6.2208 21.684C5.84572 21.309 5.63501 20.8003 5.63501 20.2698V6.26984M8.63501 6.26984V4.26984C8.63501 3.7394 8.84572 3.2307 9.2208 2.85562C9.59587 2.48055 10.1046 2.26984 10.635 2.26984H14.635C15.1654 2.26984 15.6742 2.48055 16.0492 2.85562C16.4243 3.2307 16.635 3.7394 16.635 4.26984V6.26984"
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

export default memo(Category);
