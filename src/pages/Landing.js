import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
// import AnonRoute from "./../components/AnonRoute";
import Signup from "./../components/Signup";
import Login from "./../components/Login";
import { withAuth } from "../context/auth-context";

class Landing extends Component {
  state = {
    showSignup: false,
    showLogin: false,
  };
  displaySignup = () => {
    this.setState({
      showSignup: true,
      showLogin: false,
      
    });
  };
  displayLogin = () => {
    this.setState({
      showSignup: false,
      showLogin: true,
    });
  };
  render() {
    return (
      <div className="landing-page">
        <h1>Landing Page</h1>

        {this.state.showSignup ? <Signup /> : null}
        {this.state.showLogin ? <Login /> : null}

        
        <div>
          <div>
            <img src="/images/signup.png" alt="" onClick={this.displaySignup} />
          </div>
          <div>
            <img src="/images/login.png" alt="" onClick={this.displayLogin} />
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Landing);
