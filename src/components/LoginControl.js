import React from "react";
import ToDoList from "./ToDoList.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Week from "./Week.js";

export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: true,
      isLoggedIn: false,
      user: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleLogin(user) {
    this.setState({ isLoggedIn: true, user: user });
    console.log("user " + user + " has logged in");
  }

  handleRegisterClick() {
    this.setState({isRegistered: false})
  }

  handleRegister() {
    this.setState({isRegistered: true})
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {
      return <ToDoList />;
    } else if (this.state.isRegistered) {
      return <Login onLogin={this.handleLogin} onRegisterClick={this.handleRegisterClick}/>;
    } else {
      return <Register onRegister={this.handleRegister} />;
    }
  }
}
