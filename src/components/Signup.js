import React, { Component } from "react";

import { withAuth } from "./../context/auth-context";
import Select from "react-select";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    artistType: [],
    instrument: [],
    errorMessage: false,

    artistTypeOptions: [
      { value: "Singer", label: "Singer" },
      { value: "Rapper", label: "Rapper" },
      { value: "Composer", label: "Composer" },
      { value: "Mixing engineer", label: "Mixing engineer" },
      { value: "Producer", label: "Producer" },
      { value: "Songwriter", label: "Songwriter" },
      { value: "Sound designer", label: "Sound designer" },
      { value: "Beatmaker", label: "Beatmaker" },
    ],
    instrumentOptions: [
      { value: "Guitar", label: "Guitar" },
      { value: "Piano", label: "Piano" },
      { value: "Sax", label: "Sax" },
      { value: "Violin", label: "Violin" },
      { value: "Horn", label: "Horn" },
      { value: "Drum", label: "Drum" },
      { value: "Trumpet", label: "Trumpet" },
      { value: "Ukelele", label: "Ukelele" },
      { value: "Accordion", label: "Accordion" },
      { value: "Bass", label: "Bass" },
      { value: "Keyboard", label: "Keyboard" }
    ]
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: false,
    });
    const { username, password, email, artistType, instrument } = this.state;
    if (
      username === "" ||
      password === "" ||
      email === "" ||
      artistType === "" ||
      instrument === ""
    ) {
      this.setState({
        errorMessage: "Must fill in all the forms",
      });
      return
    }
    
    
    this.props.signup(username, password, email, artistType, instrument)
    if(this.props.error){
      this.setState({
        errorMessage: "Username already exists",
      });
      return
    }
    
  };

  handleText = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckbox = (event) => {
    const { name, checked, value } = event.target;
    // console.log(checked);
    if (checked) {
      this.setState({
        [name]: [...this.state[name], value],
      });
    } else if (!checked) {
      const updatedList = this.state[name].filter((type) => {
        return type !== value;
      });
      this.setState({
        [name]: updatedList,
      });
    }

    // console.log(name, this.state[name]);
  };

  handleTypeSelect = (artistType) => {
    // console.log(artistType);
    // const arr=artistType.map()
    this.setState({ artistType: artistType });
  };

  handleInstrumentSelect = (instrument) => {
    // console.log(instrument);
    // const arr=artistType.map()
    this.setState({ instrument });
  };

  

  render() {
    const { username, password, email } = this.state;
    const { artistType,instrument } = this.state;
    
    return (
      
      <div id="signup">
        
        
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
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={this.handleText}
              placeholder="EMAIL"
            />
            <label htmlFor="floatingInput">EMAIL</label>
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
          <div>
            <p className="select-title">ARTIST TYPE</p>
            <Select
            value={artistType}
            onChange={this.handleTypeSelect}
            options={this.state.artistTypeOptions}
            isMulti
            id="select"            
          />
          </div>
          <br/>
          <div>
            <p className="select-title">INSTRUMENT</p>
            <Select
            value={instrument}
            onChange={this.handleInstrumentSelect}
            options={this.state.instrumentOptions}
            isMulti
            id="select"
          />
          </div>
          



          

          <div className='errorMessage'>
            {this.state.errorMessage}
          </div>

         

          <button>SIGNUP</button>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);

// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;
