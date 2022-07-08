import React from "react";
import "./HomeCard.css";
import { Link } from "react-router-dom";
class HomeCard extends React.Component {
  render() {
    return (
      <Link
        to="/products"
        onClick={() => {
          this.props.onClick(this.props.name);
        }}
      >
        <div className={`home-card ${this.props.className}`}>
          <p className="card-text">{this.props.name}</p>
        </div>
      </Link>
    );
  }
}
export default HomeCard;
