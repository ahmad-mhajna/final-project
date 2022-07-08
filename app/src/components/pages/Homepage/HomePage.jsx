import HomeCard from "./Card/HomeCard";
import "./HomePage.css";

const categories = [
  "Burger",
  "Sweets",
  "Icecream",
  "Sandwiches",
  "BBQ",
  "Bakery",
  "Pizza",
  "Italian",
  "Shawarma",
  "Drinks",
  "Hummus Falafel",
  "Fried Chicken",
  "Seafood",
  "Asian",
  "Vegan",
];
function HomePage({ onSelect }) {
  return (
    <div className="home-cards">
      {categories.map((category) => {
        return (
          <HomeCard
            name={category}
            className={category.replace(" ", "")}
            onClick={onSelect}
          />
        );
      })}
    </div>
  );
}
export default HomePage;
