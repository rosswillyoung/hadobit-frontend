import React from "react";
import Register from "./Register.js";
import Login from "./Login.js";
import Main from "./Main";
import ls from "local-storage";

export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: true,
      isLoggedIn: false,
      user: "",
      accessToken: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount(){
    if (ls.get('accessToken')) {
      let accessToken = ls.get('accessToken');
      console.log(accessToken.toString());
      this.setState({accessToken: accessToken, isLoggedIn: true})
    }
  }

  handleLogin(user, token) {
    this.setState({ isLoggedIn: true, user: user, accessToken: token});
    // ls.set('accessToken', accessToken);
  }

  handleRegisterClick() {
    this.setState({isRegistered: false})
  }

  handleRegister() {
    this.setState({isRegistered: true})
  }

  handleLogOut() {
    this.setState({isLoggedIn: false, accessToken: null, user: null})
    ls.set('accessToken', null);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {
      return <Main user={this.state.user} accessToken={this.state.accessToken} onLogOut={this.handleLogOut}/>
    } else if (this.state.isRegistered) {
      return <Login onLogin={this.handleLogin} onRegisterClick={this.handleRegisterClick}/>;
    } else {
      return <Register onRegister={this.handleRegister} />;
    }
  }
}
