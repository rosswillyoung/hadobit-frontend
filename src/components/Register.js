import React from "react";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMatches: false,
      emailLegit: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  async handleSubmit(event) {
    event.preventDefault();
    // this.setState({
    //   passwordMatches: this.state.password === this.state.confirmPassword,
    // });
    if (!this.state.passwordMatches || !this.state.emailLegit) {
      console.log("Passwords do not match or email is not legit");
      return;
    }
    // console.log(event.target.value);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
      }),
    };
    this.props.onRegister();
    await fetch("/users/create", requestOptions);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleEmailChange(event) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(event.target.value));

    this.setState({
      email: event.target.value,
      emailLegit: re.test(event.target.value),
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handleConfirmPasswordChange(event) {
    if (event.target.value === this.state.password) {
      this.setState({ passwordMatches: true });
    } else {
      this.setState({ passwordMatches: false });
    }
    this.setState({
      confirmPassword: event.target.value,
    });
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
            type="text"
            name="email"
            className="text-input w-75"
            value={this.state.email}
            onChange={this.handleEmailChange}
            placeholder="Email"
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
          <input
            type="password"
            name="confirmPassword"
            ref="password"
            className="text-input w-75"
            placeholder="Confirm Password"
            onChange={this.handleConfirmPasswordChange}
            value={this.state.confirmPassword}
          />
          <button type="submit" className="col-lg-12 btn btn-primary w-25">
            CREATE ACCOUNT
          </button>
        </form>
      </div>
    );
  }
}
