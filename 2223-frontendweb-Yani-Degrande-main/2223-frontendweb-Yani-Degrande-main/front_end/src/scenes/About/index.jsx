// ============ About page ============
// Description: This is the about page of the application. It contains a description of the farm.


// === Imports ===

// - Styles
import "./index.scss";

// === About ===
export default function About() {
  return (
    <div className="about grid">
      <div className="about__image">
        <img
          className="lou-img"
          src={require("../../assets/images/louPoort.webp")}
          alt="Lou"
        />
      </div>
      <div className="about__data grid">
        <h2>About us</h2>
        <p>
          Children's farm Degrande originated as a hobby and out of love for
          nature. Initially there were only chickens and pigeons. Then came
          rabbits, parakeets, cats and finally mountain goats.
          <br />
          All our animals are surrounded with the best care and lots of love.
          They are very tame and will come to you for a cuddle or they will just
          sit on your shoulder to rest. A real delight for small children.
          <br />
          Moreover, Children's farm Degrande is located in a quiet, wooded area
          where you regularly see squirrels playing with each other. A real
          pleasure to watch.
          <br />
          And of course the parents are not forgotten either. While the children
          have fun with the animals, the parents can enjoy a snack in our
          cafeteria or on the terrace when the weather is nice.
          <br />
          We invite you all to come and take a look at our petting zoo and enjoy
          the peace, nature and animals with us. We welcome you in advance.
          <br />
          <br />
          See you soon.
        </p>
      </div>
    </div>
  );
}
