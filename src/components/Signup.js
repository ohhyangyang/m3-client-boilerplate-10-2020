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
    const { username, password, email, artistType, instrument } = this.state;
    // if (
    //   username === "" ||
    //   password === "" ||
    //   email === "" ||
    //   artistType === "" ||
    //   instrument === ""
    // ) {
    //   this.setState({
    //     errorMessage: true,
    //   });
    // }
    this.props.signup(username, password, email, artistType, instrument);
  };

  handleText = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckbox = (event) => {
    const { name, checked, value } = event.target;
    console.log(checked);
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

    console.log(name, this.state[name]);
  };

  handleTypeSelect = (artistType) => {
    console.log(artistType);
    // const arr=artistType.map()
    this.setState({ artistType: artistType });
  };

  handleInstrumentSelect = (instrument) => {
    console.log(instrument);
    // const arr=artistType.map()
    this.setState({ instrument });
  };

  render() {
    const { username, password, email } = this.state;
    const { artistType,instrument } = this.state;
    
    return (
      
      <div>
        <h3>Sign Up</h3>

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
            <p>ARTIST TYPE</p>
            <Select
            value={artistType}
            onChange={this.handleTypeSelect}
            options={this.state.artistTypeOptions}
            isMulti
          />
          </div>
          
          <div>
            <p>INSTRUMENT</p>
            <Select
            value={instrument}
            onChange={this.handleInstrumentSelect}
            options={this.state.instrumentOptions}
            isMulti
          />
          </div>
          



          {/* <div>
            <p>ARTIST TYPE</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Singer"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Singer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Rapper"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Rapper
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Composer"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Composer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Mixing engineer"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Mixing engineer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Producer"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Producer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Songwriter"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Songwriter
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Sound designer"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Sound designer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Beatmaker"
                name="artistType"
                onChange={this.handleCheckbox}
              />
              Beatmaker
            </div>
          </div>

          <div>
            <p>INSTRUMENT</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Guitar"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Guitar
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Piano"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Piano
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Sax"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Sax
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Violin"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Violin
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Horn"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Horn
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Drum"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Drum
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Trumpet"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Trumpet
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Ukelele"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Ukelele
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Accordion"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Accordion
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Bass"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Bass
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Keyboard"
                name="instrument"
                onChange={this.handleCheckbox}
              />
              Keyboard
            </div>
          </div> */}

          {/* <div>
            {this.state.errorMessage ? "Must fill in all the forms" : null}
          </div> */}
          
          {/* <div>
          
            {this.props.error}
          </div> */}

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);

// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;
