import React, { Component } from "react";

class Display extends Component {
  render() {
    return <div className="display-panel">{this.props.value}</div>;
  }
}

export default Display;
