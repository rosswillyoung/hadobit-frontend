import React from "react";
import ListTemplate from "./ListTemplate.js";

class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "7vw",
      height: "7vh",
    };
    this.makeBigger = this.makeBigger.bind(this);
    this.makeSmaller = this.makeSmaller.bind(this);
  }

  makeBigger() {
    this.setState({
      width: "8vw",
      height: "8vw",
    });
  }
  makeSmaller() {
    this.setState({
      width: "7vw",
      height: "7vh",
    });
  }

  render() {
    return (
      <div className="container col-lg-3 bg-dark m-auto">
        <div className="text-center ">
          <div className="col-lg-12 align-items-center">
            <svg
              className=""
              width={this.state.width}
              height={this.state.height}
              viewBox="0 0 16 16"
              class="bi bi-plus-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              onMouseOver={this.makeBigger}
              onMouseLeave={this.makeSmaller}
              onClick={this.props.onButtonClicked}
            >
              <path
                fill-rule="evenodd"
                d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
              />
              <path
                fill-rule="evenodd"
                d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
              />
              <path
                fill-rule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateList;
