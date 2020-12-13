import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

class Menu extends Component {
  state = {
    menuStyle: { right: "100vw" },
    showMenu: false,
  };
  handleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
      menuStyle: this.state.showMenu ? { right: "100vw" } : { right: "0vw" },
    });
    if (!this.state.showMenu) {
      this.pTag1.classList.add("animate__slideInLeft");
      this.pTag2.classList.add("animate__slideInLeft");
      this.pTag3.classList.add("animate__slideInLeft");
      this.pTag4.classList.add("animate__slideInLeft");
      this.pTag5.classList.add("animate__slideInLeft");
    }else{
      this.pTag1.classList.remove("animate__slideInLeft");
      this.pTag2.classList.remove("animate__slideInLeft");
      this.pTag3.classList.remove("animate__slideInLeft");
      this.pTag4.classList.remove("animate__slideInLeft");
      this.pTag5.classList.remove("animate__slideInLeft");
    }
  };

  closeMenu = () => {
    this.setState({
      showMenu: false,
      menuStyle: { right: "100vw" },
    });
  };
  render() {
    console.log(this.state.slideIn, this.state.menuStyle);
    return (
      <div id="menu">
        <div onClick={this.handleMenu} className="menu-btn">
          {this.state.showMenu ? (
            <img src="/images/refuse black.png" alt="" />
          ) : (
            <p>MENU</p>
          )}
        </div>

        <div style={this.state.menuStyle} className="menu-wrapper">
          <div className="links-wrapper">
            <Link to="/wusic/musicians" onClick={this.closeMenu}>
              <p
                className="animate__animated"
                ref={(p) => (this.pTag1 = p)}
              >
                " HELP, I NEED SOMEBODY! "
              </p>
            </Link>
            <Link to="/wusic/projects" onClick={this.closeMenu}>
              <p
                className="animate__animated p2"
                ref={(p) => (this.pTag2 = p)}
              >
                " ALL YOU NEED IS MAKING MUSIC "
              </p>
            </Link>
            <Link to="/wusic/dashboard" onClick={this.closeMenu}>
              <p
                className="animate__animated p3"
                ref={(p) => (this.pTag3 = p)}
              >
                DASHBOARD
              </p>
            </Link>
            <Link
              to={`/wusic/musicians/${this.props.user._id}`}
              onClick={this.closeMenu}
            >
              <p
                className="animate__animated p4"
                ref={(p) => (this.pTag4 = p)}
              >
                PROFILE
              </p>
            </Link>
            <Link to="/wusic/about" onClick={this.closeMenu}>
              <p
                className="animate__animated p5"
                ref={(p) => (this.pTag5 = p)}
              >
                ABOUT
              </p>
            </Link>
          </div>

          <div className="logout-wrapper">
            <p>{this.props.user && this.props.user.username}</p>

            <button onClick={this.props.logout}>LOG OUT</button>
          </div>

          <div className="contacts-wrapper">
            <img src="/images/logo-wusic.svg" alt="" />
            <p>EMAIL: hello@wusic.com</p>
            <div className="contact-logos">
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
