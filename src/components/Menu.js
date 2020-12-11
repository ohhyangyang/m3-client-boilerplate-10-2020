import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

class Menu extends Component {
  state = {
    menuStyle: { position: "relative", right: "10vw" },
    showMenu: false,
  };
  handleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
      menuStyle: this.state.showMenu
        ? { position: "relative", right: "10vw" }
        : { position: "relative", right: "0" },
    });
  };

  closeMenu=()=>{
      this.setState({
          showMenu:false,
          menuStyle:{ position: "relative", right: "10vw" }
      })
  }
  render() {
    return (
      <div>
        <div onClick={this.handleMenu}>
          {this.state.showMenu ? (
            <img src="/images/refuse black.png" alt="" />
          ) : (
            <p>MENU</p>
          )}
        </div>

        <div style={this.state.menuStyle}>
          <Link to="/wusic/musicians" onClick={this.closeMenu}>
            <p>" HELP, I NEED SOMEBODY! "</p>
          </Link>
          <Link to="/wusic/projects" onClick={this.closeMenu}>
            <p>" ALL YOU NEED IS MAKING MUSIC "</p>
          </Link>
          <Link to="/wusic/dashboard" onClick={this.closeMenu}>
            <p>DASHBOARD</p>
          </Link>
          <Link to={`/wusic/musicians/${this.props.user._id}`} onClick={this.closeMenu}>
            <p>PROFILE</p>
          </Link>
          <Link to="/wusic/about" onClick={this.closeMenu}>
            <p>ABOUT</p>
          </Link>
          

          
            <div>
              <p>{this.props.user && this.props.user.username}</p>
              <Link>
              <button onClick={this.props.logout}>Logout</button>
              </Link>
            </div>
          
          <div>
            <p>EMAIL: hello@wusic.com</p>
            <div>
              <img src="/images/facebook.png" alt=""  onClick={this.closeMenu}/>
              <img src="/images/instagram.png" alt=""  onClick={this.closeMenu}/>
              <img src="/images/twitter.png" alt=""  onClick={this.closeMenu}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Menu);
