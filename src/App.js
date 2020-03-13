import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Display from "./components/display";
import DigitButton from "./components/digitButton";
import OperatorButton from "./components/operatorButton";
import CancelButton from "./components/cancelButton";

class App extends Component {
  state = {
    value: "0",
    prevValue: "",
    operation: "",
    decimal: false,
    resetOnKey: false
  };
  handleDigit = digit => obj => {
    if (this.state.value !== "0" && !this.state.resetOnKey) {
      let value = this.state.value + "" + digit;
      this.setState({
        value: value,
        resetOnKey: false
      });
    } else this.setState({ value: "" + digit, resetOnKey: false });
  };
  handleOperation = operation => obj => {
    if (operation === ".") {
      if (!this.state.decimal) {
        this.handleDigit(operation)(obj);
        if (this.state.resetOnKey) {
          this.setState({
            decimal: true,
            value: "0."
          });
        } else {
          this.setState({
            decimal: true,
            value: this.state.value + "" + operation
          });
        }
      }
    } else if (operation === "=") {
      this.doOperation();
    } else if (operation === "%") {
      this.doOperationPercent();
    } else if (
      operation === "+" ||
      operation === "-" ||
      operation === "*" ||
      operation === "/"
    ) {
      this.doOperation();
      this.setState({
        operation: operation
      });
    } else if (operation === "AC") {
      this.setState({
        value: "0",
        prevValue: "",
        operation: "",
        decimal: false,
        resetOnKey: false
      });
    } else if (operation === "BS") {
      let { value } = this.state;
      let newValue =
        value.length > 1 ? value.substring(0, value.length - 1) : "0";
      this.setState({
        value: newValue
      });
    } else if (operation === "C") {
      this.setState({
        value: "0"
      });
    }
  };
  doOperationPercent = () => {
    if (this.state.prevValue !== "" && this.state.operation !== "") {
      let result;
      if (this.state.operation === "+") {
        result =
          Number(this.state.prevValue) +
          (Number(this.state.value) * Number(this.state.prevValue)) / 100;
      } else if (this.state.operation === "-") {
        result =
          Number(this.state.prevValue) -
          (Number(this.state.value) * Number(this.state.prevValue)) / 100;
      } else if (this.state.operation === "*") {
        result =
          (Number(this.state.prevValue) * Number(this.state.value)) / 100;
      } else if (this.state.operation === "/") {
        result =
          Number(this.state.prevValue) / (Number(this.state.value) / 100);
      }
      this.setState({
        value: result,
        prevValue: result,
        operation: "",
        decimal: false,
        resetOnKey: true
      });
    } else {
      this.setState({
        value: this.state.value,
        prevValue: this.state.value,
        operation: "",
        decimal: false,
        resetOnKey: true
      });
    }
  };
  doOperation = () => {
    if (this.state.prevValue !== "" && this.state.operation !== "") {
      let result;
      if (this.state.operation === "+") {
        result = Number(this.state.prevValue) + Number(this.state.value);
      } else if (this.state.operation === "-") {
        result = Number(this.state.prevValue) - Number(this.state.value);
      } else if (this.state.operation === "*") {
        result = Number(this.state.prevValue) * Number(this.state.value);
      } else if (this.state.operation === "/") {
        result = Number(this.state.prevValue) / Number(this.state.value);
      }
      this.setState({
        value: result,
        prevValue: result,
        operation: "",
        decimal: false,
        resetOnKey: true
      });
    } else {
      this.setState({
        value: this.state.value,
        prevValue: this.state.value,
        operation: "",
        decimal: false,
        resetOnKey: true
      });
    }
  };

  render() {
    return (
      <div className="App">
        {
          <div>
            <Display value={this.state.value}></Display>

            <div className="p-1">
              {[1, 2, 3].map(num => (
                <DigitButton
                  digit={num}
                  key={num}
                  onClick={this.handleDigit(num)}
                ></DigitButton>
              ))}

              <OperatorButton
                operation="+"
                key="+"
                onClick={this.handleOperation("+")}
              ></OperatorButton>
              <CancelButton
                operation="AC"
                key="AC"
                onClick={this.handleOperation("AC")}
              ></CancelButton>
            </div>
            <div className="p-1">
              {[4, 5, 6].map(num => (
                <DigitButton
                  digit={num}
                  key={num}
                  onClick={this.handleDigit(num)}
                ></DigitButton>
              ))}
              <OperatorButton
                operation="-"
                key="-"
                onClick={this.handleOperation("-")}
              ></OperatorButton>
              <CancelButton
                operation="BS"
                key="BS"
                onClick={this.handleOperation("BS")}
              ></CancelButton>
            </div>
            <div className="p-1">
              {[7, 8, 9].map(num => (
                <DigitButton
                  digit={num}
                  key={num}
                  onClick={this.handleDigit(num)}
                ></DigitButton>
              ))}
              <OperatorButton
                operation="*"
                key="*"
                onClick={this.handleOperation("*")}
              ></OperatorButton>
              <CancelButton
                operation="C"
                key="C"
                onClick={this.handleOperation("C")}
              ></CancelButton>
            </div>
            <div className="p-1">
              <OperatorButton
                operation="."
                key="."
                onClick={this.handleOperation(".")}
              ></OperatorButton>
              <DigitButton
                digit={0}
                key={0}
                onClick={this.handleDigit(0)}
              ></DigitButton>
              <OperatorButton
                operation="="
                key="="
                onClick={this.handleOperation("=")}
              ></OperatorButton>
              <OperatorButton
                operation="/"
                key="/"
                onClick={this.handleOperation("/")}
              ></OperatorButton>
              <OperatorButton
                operation="%"
                key="%"
                onClick={this.handleOperation("%")}
              ></OperatorButton>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
