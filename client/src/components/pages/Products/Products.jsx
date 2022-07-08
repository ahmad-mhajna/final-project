import "./Products.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {} from "react-router-dom";
import Button from "../../Button/Button";
import Input from "../../input/Input";
import Card from "../../Card/Card";
import Select from "react-select";
function Products({
  data,
  deleteFood,
  setFood,
  setEdit,
  category,
  addToCart,
  resetCategory,
  admin,
}) {
  const spinnerRef = useRef();
  const [search, filterFood] = useState(data);
  const [sort, setsort] = useState("off");
  const [keywords, setKeywords] = useState("");
  const [selectedCategories, setCategories] = useState([]);
  useEffect(() => {
    if (category !== "") {
      setCategories([category]);
    }
    // eslint-disable-next-line
  }, []);

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
  const filterBYCategory = (array) => {
    if (selectedCategories.length < 1) {
      return array;
    }
    return array.filter(
      (item) =>
        !selectedCategories
          .map((category) => item.categories.includes(category))
          .includes(false)
    );
  };

  useEffect(() => {
    let newArray = [...data];
    newArray = filterBYCategory(newArray);
    newArray = sortByPrice(newArray);
    newArray = newArray.filter((food) =>
      food.name.toLowerCase().includes(keywords)
    );
    filterFood(newArray);
    resetCategory();
    // eslint-disable-next-line
  }, [sort, selectedCategories, keywords, data]);
  const searchbar = (event) => {
    const input = event.target.value;
    setKeywords(input.toLowerCase());
  };
  const sortByPrice = (arr) => {
    let newarray = [...arr];
    if (sort === "off") {
      newarray.sort((a, b) => a.id - b.id);
    } else if (sort === "low-high") {
      newarray.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      newarray.sort((a, b) => b.price - a.price);
    }
    return newarray;
  };
  const options = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="app-root">
      {admin && (
        <Link to="/form" className="add-btn">
          Add Food
        </Link>
      )}
      <div className="search-nav">
        <Select
          className="select"
          value={selectedCategories.map((category) => ({
            value: category,
            label: category,
          }))}
          options={options}
          isMulti
          placeholder="Select Catagories"
          onChange={(value) => {
            setCategories(
              value.map((value) => {
                return value.label;
              })
            );
          }}
        />
        <Input label="Search" onChange={searchbar} />
        <div className="btn-container">
          <Button
            text={
              sort === "off"
                ? "Sort : Off"
                : sort === "low-high"
                ? "Sort : Low-High"
                : "Sort : High-Low"
            }
            onClick={() => {
              setsort(
                sort === "off"
                  ? "low-high"
                  : sort === "low-high"
                  ? "high-low"
                  : "off"
              );
            }}
          />
        </div>
      </div>
      <div className="cards">
        {search.map((food, i) => {
          return (
            <Card
              food={food}
              key={i}
              addToCart={addToCart}
              deleteFood={deleteFood}
              admin={admin}
              editFood={(food) => {
                setFood(food);
                setEdit(true);
              }}
            />
          );
        })}
      </div>
      <div className="spinner hidden" ref={spinnerRef}>
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
}

export default Products;
