import React, { Component } from "react";
import { withAuth } from './../context/auth-context';

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
  };

  handleText = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h3>Login</h3>

        <form onSubmit={this.handleFormSubmit}>
          
        <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleText}
              placeholder="NAME"
            />
            <label htmlFor="floatingInput">NAME</label>
          </div>

          <label>Password:</label>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleText}
              placeholder="PASSWORD"
            />
            <label htmlFor="floatingInput">PASSWORD</label>
          </div>
          
          {/* <div>
        
            {this.props.error}
          </div> */}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
