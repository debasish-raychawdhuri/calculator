import React, { Component } from "react";

class DigitButton extends Component {
  state = {};
  render() {
    return (
      <span className="m-1">
        <button
          className="btn-lg btn-primary grid-item"
          onClick={this.props.onClick}
        >
          {this.props.digit}
        </button>
      </span>
    );
  }
}

export default DigitButton;
