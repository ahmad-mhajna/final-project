import React from "react";
import "./Card.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
class Card extends React.Component {
  render() {
    return (
      <div className={`card ${this.props.className || ""}`}>
        <div
          className="img-container"
          style={{
            background: `url(${this.props.food.img}) no-repeat center center/cover`,
          }}
        ></div>
        <p className="card-text">{this.props.food.name}</p>
        <div className="category-container">
          {this.props.food.categories.map((category) => (
            <p className="card-text category">{category},</p>
          ))}
        </div>
        <p className="card-text price">{this.props.food.price}$</p>
        {this.props.admin && (
          <div className="admin-container">
            <Link
              onClick={() => {
                this.props.editFood(this.props.food);
              }}
              to="/form"
            >
              <Button
                text="Edit"
                id={this.props.food.id}
                className="cart-btn alt"
              />
            </Link>
            <Button
              text="Delete"
              onClick={this.props.deleteFood}
              id={this.props.food.id}
              className="cart-btn alt"
            />
          </div>
        )}

        <Button
          text="Add to Cart"
          onClick={() => {
            this.props.addToCart((prevState) => {
              if (!prevState.find((item) => item.id === this.props.food.id))
                return [...prevState, this.props.food];
              else {
                const stateCopy = [...prevState];
                const foodCopy = stateCopy.find(
                  (item) => item.id === this.props.food.id
                );
                foodCopy.quantity++;
                return stateCopy;
              }
            });
          }}
          className="cart-btn alt"
        />
      </div>
    );
  }
}
export default Card;
