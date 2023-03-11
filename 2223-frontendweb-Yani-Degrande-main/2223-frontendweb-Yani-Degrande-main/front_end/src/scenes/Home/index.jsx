// ============ Home page ============
// Description: This is the home page of the application. It contains a description of the farm and a button to go to the reservation page.

// === Imports ===

// - React
import { Link } from "react-router-dom";

// - Styles
import "./index.scss";


// === Home ===
export default function Home() {

  // === functions ===

  // - Change active nav
  const reservationBtnClicked = () => { 
    const activeNav = document.querySelector(".active");
    const reservationNav = document.querySelector("#res");

    console.log(reservationNav);

    reservationNav.classList.add("active");
    activeNav.classList.remove("active");
  }
  
  // - Return
  return (
    <div className="home grid">
      <div className="home__data grid">
        <h1>DEGRANDE</h1>
        <p>
          Children's farm 'Degrande' attaches great importance to nature and the environment. The animals are surrounded with the best care in a beautiful, green environment. It is a fun and educational experience for the children to watch, help care for and cuddle the animals. While the adults can enjoy a snack and a drink in our cafeteria.
        </p>
        <button data-cy="home_reservation" onClick={reservationBtnClicked}><Link to="/reservation">RESERVATION</Link></button>
      </div>
      <div className="home__image">
        <svg
          viewBox="0 0 780 756"
          fill="none"
        >
          <path
            d="M473.121 79.152C541.756 75.272 627.873 86.912 686.148 140.456C745.071 194 776.151 289.448 732.768 354.632C690.033 419.816 572.188 454.736 527.511 536.992C482.833 619.248 511.323 748.84 485.423 755.048C460.171 762.032 380.528 646.408 326.786 594.416C272.396 542.424 242.611 554.84 202.466 557.944C162.321 561.824 111.168 556.392 124.766 526.128C137.716 495.864 216.063 439.992 192.753 367.824C170.091 296.432 45.1231 207.968 10.8056 134.248C-24.1594 60.528 31.5256 0 94.9806 0C159.083 0.776 230.308 61.304 291.821 82.256C353.333 102.432 404.486 83.032 473.121 79.152Z"
            fill="#B1C195"
          />
          <image className="bambi-img"  x="300" y="-20" xlinkHref={require("../../assets/images/Bambi.png")} alt = "Bambi"/>
        </svg>
        
      </div>
    </div>
  );
}