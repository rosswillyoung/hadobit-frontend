import React from "react";
import Task from "./Task.js";

export default class Week extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", tasks: [], user_id: "", apiUrl: "/tasks/week" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    this.setState({ value: "", tasks: [] });
    const response = await fetch(this.state.apiUrl);
    const data = await response.json();
    this.setState({ data: data });
    this.state.data.map((data) =>
      this.setState({ tasks: this.state.tasks.concat(data) })
    );
    console.log(this.state.tasks);
  }

  async fetchData() {
    this.setState({ value: "", tasks: [] });
    const response = await fetch(this.state.apiUrl);
    const data = await response.json();
    this.setState({ data: data });
    this.state.data.map((data) =>
      this.setState({ tasks: this.state.tasks.concat(data) })
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    this.setState({ tasks: [] });
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: this.state.value }),
    };
    const response = await fetch(this.state.apiUrl, requestOptions).then((res) => res.json()).then(data => console.log(data.passport.user));
    this.setState({ value: "" });
    this.componentWillMount();
    // DataLoader.componentWillMount();
  }

  render() {
    return (
      <div
        className="container col-lg-6 card mb-3 p-3 bg-light rounded shadow-sm"
        id="tasklist"
        // style={{marginTop: 25 + 'vh'}}
      >
        <div className="col-lg-12">
          <div id="tasklist" className="mb-3 align-items-center">
            <h1 className="header text-center bg-dark text-white rounded jumbotron">
              This Week
            </h1>
            {this.state.tasks.map((task) => (
              <Task
                key={task._id}
                id={task._id}
                task={task.task}
                date={task.date}
                completed={task.completed}
                subtasks={task.subtasks}
                refresh={() => {
                  this.fetchData();
                }}
                clicked={this.state.taskClicked}
              />
              // console.log(task)
            ))}
          </div>
          {/* <DataLoader addTaskToState={this.addTaskToState} /> */}
        </div>
        <div className="col-lg-12 text-center bg-light w-100">
          <div className="">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                name="task"
                className="text-input w-75"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export { Week };
