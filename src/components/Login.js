import React from "react";
import ls from 'local-storage';
// import axios from "axios";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  async componentDidMount() {
    const response = await fetch("/users/login");
    const data = await response.json();
    // if (data.user) {
    //   this.props.onLogin(data.user);
    // }
    // console.log(data);
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "same-origin",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    try {
      const response = await fetch(
        "/users/login",
        requestOptions
      );
      const data = await response.json();
      if (data.accessToken) {
        this.props.onLogin(data.user, data.accessToken);
        ls.set('accessToken', data.accessToken);
        console.log(ls.get('accessToken'))
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container col-lg-6 card mb-3 p-3 bg-light rounded shadow-sm text-center">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            className="text-input w-75"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            ref="password"
            className="text-input w-75"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            placeholder="Password"
          />
          <div className="col-lg-12 m-auto align-items-center text-center">
            <button type="submit" className="btn btn-primary w-25 mr-5" onClick={this.handleSubmit}>
              Log In
            </button>
            <button type="submit" className="btn btn-primary w-25 ml-5" onClick={this.props.onRegisterClick}>
                Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}
