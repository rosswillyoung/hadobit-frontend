import React from "react";
import Task from "./Task.js";
import Week from "./Week";
import ToDoList from "./ToDoList";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksWeek: [],
      tasksDay: []
    }
    this.taskUpdate = this.taskUpdate.bind(this);
  }

  async componentDidMount() {
    let today = new Date();
    const response = await fetch("tasks/week");
    const data = await response.json();
    this.setState({
      tasksWeek: data,
      tasksDay: data[today.getDay()].tasks
    });
  }

  async taskUpdate() {
    let today = new Date();
    const response = await fetch("tasks/week");
    const data = await response.json();
    this.setState({
      tasksWeek: data,
      tasksDay: data[today.getDay()].tasks
    });
  }

  render() {
    return (
      <div className="row w-100">
        <ToDoList tasks={this.state.tasksDay} taskUpdate={this.taskUpdate}/>
        <Week tasks={this.state.tasksWeek} taskUpdate={this.taskUpdate}/>
      </div>
    )
  }
}
