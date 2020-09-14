import React from "react";

export class SubTasks extends React.Component {
  render() {
    return (
      <div className="text-center">
        <ul className="text-center list-unstyled">
          <li>{this.props.subtask}</li>
        </ul>
      </div>
    );
  }
}

export class SubTaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state.value);
    this.props.addSubtask(event, this.state.value);
    this.setState({ value: "" });
    // this.props.refresh();
  }

  render() {
    return (
      <div className="text-center border-bottom">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            name="task"
            className="text-input w-75"
          />
          {/* <button type="submit" class="btn btn-primary">
                Submit
              </button> */}
        </form>
      </div>
    );
  }
}
