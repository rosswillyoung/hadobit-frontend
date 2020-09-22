import React from "react";
import Task from "./Task.js";

export default class Week extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "",
                  tasks: {
                  },
                  user_id: "",
                  apiUrl: "/tasks/week" };
  }


  render() {
    if(this.state.tasks){
      return (
        <div
          className="container col-lg-5 card mb-3 p-3 bg-light rounded shadow-sm"
          id="tasklist"
          // style={{marginTop: 25 + 'vh'}}
        >
          <div className="col-lg-12">
            <div id="tasklist" className="mb-3 align-items-center">
              <h1 className="header text-center bg-dark text-white rounded jumbotron">
                This Week
              </h1>
              <div className="row text-center">
                {this.props.tasks.map((day) => (
                  <div key={day.day} className="col-md-12 mb-10 border">
                    <div id="weekList">{day.day}</div>
                    {day.tasks.map((task) => {
                        return (
                          <Task
                            key={task._id}
                            id={task._id}
                            task={task.task}
                            date={task.date}
                            completed={task.completed}
                            subtasks={task.subtasks}
                            taskUpdate={
                              this.props.taskUpdate
                            }
                            clicked={this.state.taskClicked}
                          />
                    )})}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>Nothing to see here</div>
      )
    }
  }
}

export { Week };
