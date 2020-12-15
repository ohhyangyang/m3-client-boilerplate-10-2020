import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
// import AnonRoute from "./../components/AnonRoute";
import Signup from "./../components/Signup";
import Login from "./../components/Login";
import { withAuth } from "../context/auth-context";
import { CSSTransition} from 'react-transition-group';


class Landing extends Component {
  state = {
    showSignup: false,
    showLogin: false,
    signupColor:{},
    loginColor:{},
    hideText:false
  };
  hideText=()=>{
    this.setState({
      hideText:true
    })
  }
  displaySignup = () => {
    this.hideText()
    this.signupBtn.classList.remove("not-selected")
    this.signupBtn.classList.add("selected")
    this.loginBtn.classList.remove("selected")
    this.loginBtn.classList.add("not-selected")

    this.setState({
      showSignup: true,
      showLogin: false,
    });
  };
  displayLogin = () => {
    this.hideText()
    this.loginBtn.classList.remove("not-selected")
    this.loginBtn.classList.add("selected")
    this.signupBtn.classList.remove("selected")
    this.signupBtn.classList.add("not-selected")

    this.setState({
      showSignup: false,
      showLogin: true,
    });
  };
  render() {
    const {showSignup,showLogin} = this.state
    return (
      <div id="landing-page">
        <img src="/images/logo-wusic.svg" alt="" />
        <h2  style={this.state.hideText?{display:"none"}:null} className="text-pop-up-top">
        “ SEARCHING FOR MUSICMAN ”
        </h2>
  

        <div>
          {/* {this.state.showSignup ? <Signup/> : null}
          {this.state.showLogin ? <Login /> : null} */}
          
          
          <CSSTransition in={showSignup} unmountOnExit appear={true} timeout={300} classNames="fade">
            <Signup/>
          </CSSTransition>
          <CSSTransition in={showLogin} unmountOnExit appear={true} timeout={300} classNames="fade">
            <Login/>
          </CSSTransition>

          
        </div>

        <div className="logos">
          <div onClick={this.displayLogin} ref={(div)=>this.loginBtn=div} className="center not-selected">
            <img src="/images/login.png" alt=""/>
          </div>
          <div onClick={this.displaySignup} ref={(div)=>this.signupBtn=div} className="center not-selected">
            <img src="/images/signup.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(Landing);
