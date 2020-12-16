import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMessage: false,
  };
  login = (username, password) => {};
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      notFoundMessage: false,
    });
    const { username, password } = this.state;

    if (username === "" || password === "") {
      this.setState({
        errorMessage: "Must fill in all the forms",
      });
      return;
    }
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, password, () => {
      console.log(this.props.error);
      if (this.props.error === "User not found") {
        console.log("updated error");
        this.setState(
          {
            errorMessage: "User not found",
          },
          function () {
            console.log(this.state.errorMessage);
          }
        );
      }
    });
  };

  handleText = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div id="login">
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
          <div className="errorMessage">{this.state.errorMessage}</div>

          <button>LOGIN</button>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
