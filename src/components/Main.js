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
    if(!this.props.accessToken) {
      this.props.onLogOut();
    }
    let today = new Date();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    }
    const response = await fetch("tasks/week", requestOptions);
    const data = await response.json();
    if(data.err) {
      console.log(data.err);
      this.props.onLogOut();
    } else {
      this.setState({
        tasksWeek: data,
        tasksDay: data[today.getDay()].tasks
      });
    }
    console.log(this.state.tasksWeek);
  }

  async taskUpdate() {
    let today = new Date();
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken
      }
    }
    const response = await fetch("tasks/week", requestOptions);
    const data = await response.json().then((data) => {
      this.setState({
        tasksWeek: data,
        tasksDay: data[today.getDay()].tasks
      });
    });
  }

  render() {
    return (
      <div className="row w-100">
        <ToDoList tasks={this.state.tasksDay} taskUpdate={this.taskUpdate} accessToken={this.props.accessToken}/>
        <Week tasks={this.state.tasksWeek} taskUpdate={this.taskUpdate} accessToken={this.props.accessToken}/>
      </div>
    )
  }
}
