import React, { Component } from "react";

class CancelButton extends Component {
  state = {};
  render() {
    return (
      <span className="m-1">
        <button
          className="btn-lg btn-danger grid-item"
          onClick={this.props.onClick}
        >
          {this.props.operation}
        </button>
      </span>
    );
  }
}

export default CancelButton;
