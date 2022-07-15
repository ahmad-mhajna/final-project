import React from "react";
import Button from "../../../Button/Button";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./CheckoutCard.css";

class CheckoutCard extends React.Component {
  render() {
    return (
      <div className={`CheckoutCard ${this.props.className || ""}`}>
        <img
          className="CheckoutCard-text"
          src={this.props.food.img}
          alt="img of food"
        />
        <p className="CheckoutCard-text">{this.props.food.name}</p>
        <p className="CheckoutCard-text price">{this.props.food.price}$</p>
        <div className="CheckoutCard-text qty">
          <Button
            onClick={() => {
              this.props.addToCart((prevState) => {
                const stateCopy = [...prevState];
                const foodCopy = stateCopy.find(
                  (item) => item._id === this.props.food._id
                );
                foodCopy.quantity++;
                return stateCopy;
              });
            }}
            className="alt"
          >
            <FaArrowUp />
          </Button>
          <p className="CheckoutCard-text">{this.props.food.quantity}</p>
          <Button
            onClick={() => {
              this.props.addToCart((prevState) => {
                if (this.props.food.quantity > 1) {
                  const stateCopy = [...prevState];
                  const foodCopy = stateCopy.find(
                    (item) => item._id === this.props.food._id
                  );
                  foodCopy.quantity--;
                  return stateCopy;
                } else {
                  return prevState.filter(
                    (item) => item._id !== this.props.food._id
                  );
                }
              });
            }}
            className="alt"
          >
            <FaArrowDown />
          </Button>
        </div>
        <Button
          text="Remove"
          onClick={() => {
            this.props.addToCart((prevState) => {
              return prevState.filter(
                (item) => item._id !== this.props.food._id
              );
            });
          }}
          className="alt"
        />
      </div>
    );
  }
}
export default CheckoutCard;
