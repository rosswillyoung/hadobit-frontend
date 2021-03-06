import React from "react";
import Task from "./Task.js";

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", user_id: "", apiUrl: "/tasks/today"};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
                  "Authorization": "Bearer " +this.props.accessToken},
      body: JSON.stringify({ task: this.state.value }),
    };
    const response = await fetch("tasks/today", requestOptions);
    this.setState({ value: "" });
    this.props.taskUpdate();
    // DataLoader.componentWillMount();
  }

  handleTaskUpdate() {
    this.props.taskUpdate()
  }

  render() {
    return (
      <div
        className="container col-lg-5 mb-3 p-3 bg-light rounded shadow-sm"
        id="tasklist"
        // style={{marginTop: 25 + 'vh'}}
      >
        <div className="col-lg-12">
          <div id="tasklist" className="mb-3 align-items-center">
            <h1 className="header text-center bg-dark text-white rounded jumbotron">
              Today
            </h1>
            {this.props.tasks.map((task) => (
              <Task
                key={task._id}
                id={task._id}
                task={task.task}
                date={task.date}
                completed={task.completed}
                subtasks={task.subtasks}
                taskUpdate={this.handleTaskUpdate}
                accessToken={this.props.accessToken}
              />
              // console.log(task)
            ))}
          </div>
          {/* <DataLoader addTaskToState={this.addTaskToState} /> */}
        </div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                name="task"
                className="text-input"
                id="task-input"
              />
            </form>
      </div>
    );
  }
}

export { ToDoList };
