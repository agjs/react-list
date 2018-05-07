import React, { Fragment } from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selected: -1,
      devices: [
        { name: "aaaaaaaaaaaaaa" },
        { name: "bbbbbbbbbbbbbb" },
        { name: "cccccccccccccc" },
        { name: "dddddddddddddd" },
        { name: "eeeeeeeeeeeeee" },
        { name: "ffffffffffffff" },
        { name: "gggggggggggggg" }
      ]
    };
    this.liRef = React.createRef();
  }

  onArrowUpKeyPress = () => {
    if (this.state.selected !== 0) {
      this.setState({ selected: this.state.selected - 1 });
    } else {
      this.setState({ selected: -1 });
    }
  };

  onArrowDownKeyPress = () => {
    this.setState({ selected: this.state.selected + 1 });

    if (this.state.selected > this.state.devices.length - 2) {
      this.setState({ selected: 0 });
    }
  };

  onEnterKeyPress = () => {
    if (this.state.selected > -1) {
      console.log("Device selected, stream!");
      this.liRef.current.children[1].click();
    } else {
      console.log("Search, no device selected!");
    }
  };

  handleKeyDown = e => {
    if (e.key === "ArrowUp") {
      this.onArrowUpKeyPress();
    } else if (e.key === "ArrowDown") {
      this.onArrowDownKeyPress();
    } else if (e.key === "Enter") {
      this.onEnterKeyPress();
    }
  };

  fakeStream() {
    console.log("Foo!");
  }

  render() {
    return (
      <Fragment>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <ul className="device-list">
          {this.state.devices.map((device, index) => {
            return (
              <li
                ref={this.state.selected === index ? this.liRef : null}
                className={this.state.selected === index ? "selected" : ""}
                key={index}
              >
                {device.name}
                <button onClick={this.fakeStream}>Window</button>
                <button onClick={this.fakeStream}>Screen</button>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
