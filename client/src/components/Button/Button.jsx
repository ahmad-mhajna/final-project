import React from "react";
import "./Button.css";
class Button extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className={this.props.className}
        data-id={this.props.id}
        type={this.props.type}
      >
        {this.props.text}
        {this.props.children}
      </button>
    );
  }
}
export default Button;
