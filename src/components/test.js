
                <div className="col-md-4">
                  <h3>MONDAY</h3>
                  {this.state.tasks.monday.tasks.map((task) => (
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
                  ))}
                </div>
                <div className="col-md-4">
                  <h3>TUESDAY</h3>
                  {this.state.tasks.tuesday.tasks.map((task) => (
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
                  ))}
                </div>
