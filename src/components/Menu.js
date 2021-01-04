import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

class Menu extends Component {
  state = {
    showMenu: false,
  };
  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
    if (!this.state.showMenu) {
      this.menuBtn.classList.add("open");
      this.links.classList.add("open");
      this.pTag1.classList.add("open");
      this.pTag2.classList.add("open");
      this.pTag3.classList.add("open");
      this.pTag4.classList.add("open");
      this.pTag5.classList.add("open");
    } else {
      this.menuBtn.classList.remove("open");
      this.links.classList.remove("open");
      this.pTag1.classList.remove("open");
      this.pTag2.classList.remove("open");
      this.pTag3.classList.remove("open");
      this.pTag4.classList.remove("open");
      this.pTag5.classList.remove("open");
    }
  };

  closeMenu = () => {
    this.setState({
      showMenu: false,
    });
    this.menuBtn.classList.remove("open");
    this.links.classList.remove("open");
    this.pTag1.classList.remove("open");
    this.pTag2.classList.remove("open");
    this.pTag3.classList.remove("open");
    this.pTag4.classList.remove("open");
    this.pTag5.classList.remove("open");
  };
  render() {
    return (
      <div className="menu">
        <div onClick={this.toggleMenu} className="menu-btn" ref={(btn) => (this.menuBtn = btn)}>
          {this.state.showMenu ? (
            <img src="/images/refuse black.png" alt="" />
          ) : (
            <p>MENU</p>
          )}
        </div>

        <div className="menu-wrapper" ref={(div) => (this.links = div)}>
          <div className="links-wrapper">
            <Link to="/wusic/musicians" onClick={this.closeMenu}>
              <p ref={(p) => (this.pTag1 = p)}>"HELP, I NEED SOMEBODY!"</p>
            </Link>
            <Link to="/wusic/projects" onClick={this.closeMenu}>
              <p ref={(p) => (this.pTag2 = p)}>
                "ALL YOU NEED IS MAKING MUSIC"
              </p>
            </Link>
            <Link to="/wusic/dashboard" onClick={this.closeMenu}>
              <p ref={(p) => (this.pTag3 = p)}>DASHBOARD</p>
            </Link>
            <Link
              to={`/wusic/musicians/${this.props.user._id}`}
              onClick={this.closeMenu}
            >
              <p ref={(p) => (this.pTag4 = p)}>PROFILE</p>
            </Link>
            <Link to="/wusic/about" onClick={this.closeMenu}>
              <p ref={(p) => (this.pTag5 = p)}>ABOUT</p>
            </Link>
          </div>

          <div className="logout-wrapper">
            <p>{this.props.user && this.props.user.username}</p>

            <button onClick={this.props.logout}>LOG OUT</button>
          </div>

          <div className="contacts-wrapper">
            <img src="/images/logo-wusic.svg" alt="" />
            <p>hello@wusic.com</p>
            <div className="icons">
              <img src="/images/facebook.png" alt="" onClick={this.closeMenu} />
              <img
                src="/images/instagram.png"
                alt=""
                onClick={this.closeMenu}
              />
              <img src="/images/twitter.png" alt="" onClick={this.closeMenu} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Menu);
