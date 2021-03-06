import React from "react";
import { SubTasks, SubTaskInput } from "./SubTask.js";

class TaskOnly extends React.Component {
  render() {
    return (
      <div
        className="row lead border-bottom border-top"
        id="task"
        onClick={this.props.handleClick}
      >
        <div className="col-sm-1">
          <span className="checkmark"
            onClick={
              this.props.handleCheckbox
            }
          ></span>
        </div>
        <div className="col-sm-10 text-center" id={this.props.completed ? "task-checked" : "task-unchecked"}>{this.props.task}</div>
      </div>
    );
  }
}

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      id: props.id,
      task: props.task,
      date: props.date,
      subtasks: props.subtasks,
      completed: props.completed,
      cssid: "task-unchecked",
    };
    // if (this.state.subtasks == null) {
    //   this.state.subtasks = [].concat(this.props.subtasks)d
    // } else {
    //   this.state.subtasks = this.state.subtasks.split(", ");
    // }
    // this.handleClick = this.handleClick.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.subtaskURL = "/subtasks/";
  }
  componentDidMount() {
  }
  async addSubtask(event, value) {
    event.preventDefault();
    // console.log("poop");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + this.props.accessToken
       },
      body: JSON.stringify({
        id: this.state.id,
        subtask: value,
      }),
    };
    const response = await fetch(this.subtaskURL + "add", requestOptions);

    this.setState({
      subtasks: this.state.subtasks.concat({
        subtask: value,
        completed: false,
      }),
    });
    // console.log(event.target.value);
    // this.props.refresh();
  }

  async handleCheckbox() {
    // event.preventDefault();
    const requestOpts = {
      method: "POST",
      headers: { "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.props.accessToken
              },
      body: JSON.stringify({ id: this.state.id }),
    };
    await fetch("/tasks/complete", requestOpts);
    // this.setState({completed: true})
    console.log('task completed;')
    this.props.taskUpdate();
    // console.log("checkbox clicked");
  }

  render() {
    if (this.state.clicked) {
      return (
        <div className="" id={this.state.cssid}>
          <TaskOnly
            task={this.state.task}
            handleClick={() => {
              this.setState({ clicked: !this.state.clicked });
            }}
            handleCheckbox={this.handleCheckbox}
            completed={this.state.completed}
          />
          {this.state.subtasks.map((subtask) => (
            <SubTasks
              key={subtask.subtask}
              subtask={subtask.subtask}
              // addSubtask={this.addSubtask}
            />
          ))}
          <SubTaskInput addSubtask={this.addSubtask} />
        </div>
      );
    } else {
      return (
        <div className={this.props.className} id={this.state.cssid}>
          <TaskOnly
            task={this.state.task}
            handleClick={() => {
              // this.props.clicked = !this.props.clicked;
              this.setState({ clicked: !this.state.clicked });
            }}
            handleCheckbox={this.handleCheckbox}

            completed={this.state.completed}
          />
        </div>
      );
    }
  }
}

export { Task };
