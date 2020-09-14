import React from "react";
import CreateList from "./CreateList.js";
import Task from "./Task.js";

export default class ListTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracker: "",
      tracker_items: "",
      clicked: true,
      height: "7vh",
      width: "7vw",
    };
    this.handleTrackerChange = this.handleTrackerChange.bind(this);
    this.handleTrackerItemsChange = this.handleTrackerItemsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeBigger = this.makeBigger.bind(this);
    this.makeSmaller = this.makeSmaller.bind(this);
  }
  handleTrackerChange(event) {
    this.setState({ tracker: event.target.value });
  }
  handleTrackerItemsChange(event) {
    this.setState({ tracker_items: event.target.value });
  }

  makeBigger() {
    this.setState({
      width: "8vw",
      height: "8vh",
    });
  }
  makeSmaller() {
    this.setState({
      width: "7vw",
      height: "7vh",
    });
  }
  async handleSubmit(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tracker: this.state.tracker,
        tracker_items: this.state.tracker_items,
      }),
    };
    fetch("http://127.0.0.1:5000/createlist", requestOptions);
    // DataLoader.componentDidMount();
    event.preventDefault();
    this.setState({
      tracker: "",
      tracker_items: "",
    });
  }

  render() {
    if (this.state.clicked) {
      return (
        <div className="container col-lg-3 card m-auto p-3 bg-white rounded shadow-sm">
          <div className="">
            {
              // TO DO - CREATE HABIT TRACKER HERE
            }
          </div>
          <div className="text-center">
            <div className="col-lg-12 align-items-center">
              <form>
                <div className="col-lg-12">
                  <label htmlFor="tracker">Tracker Name</label>
                  <input
                    className="text-input"
                    type="text"
                    value={this.state.tracker}
                    onChange={this.handleTrackerChange}
                    name="tracker"
                  />
                </div>
                <div className="col-lg-12">
                  <label htmlFor="items" className="">
                    Tracker Items
                  </label>
                  <input
                    className="text-input w-75"
                    type="text"
                    value={this.state.tracker_items}
                    onChange={this.handleTrackerItemsChange}
                    name="items"
                  />
                </div>
                <button
                  type="button"
                  value="Submit"
                  onClick={this.handleSubmit}
                  className="btn-primary col-lg-12 text-center w-50"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <CreateList onButtonClicked={() => this.setState({ clicked: true })} />
      );
    }
  }
}

export { ListTemplate };
