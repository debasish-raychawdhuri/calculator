import React, { Component } from "react";

class OperatorButton extends Component {
  state = {};
  render() {
    return (
      <span className="m-1">
        <button
          className="btn-lg btn-success grid-item"
          onClick={this.props.onClick}
        >
          {this.props.operation}
        </button>
      </span>
    );
  }
}

export default OperatorButton;
