import React, { Component } from "react";
// import {withAuth} from './../context/auth-context'
import axios from "axios";
import apiService from "./../lib/api-service";
import { withAuth } from "./../context/auth-context";
import Select from "react-select";

class AddProject extends Component {
  state = {
    title: "",
    type: "",
    lookingFor: [],
    location: "",
    fee: "",
    coverURL: "",
    description: "",

    lookingForOptions: [
      { value: "Singer", label: "Singer" },
      { value: "Rapper", label: "Rapper" },
      { value: "Composer", label: "Composer" },
      { value: "Mixing engineer", label: "Mixing engineer" },
      { value: "Producer", label: "Producer" },
      { value: "Songwriter", label: "Songwriter" },
      { value: "Sound designer", label: "Sound designer" },
      { value: "Beatmaker", label: "Beatmaker" },
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
      { value: "Keyboard", label: "Keyboard" },
    ],
  };

  handleText = (event) => {
    const { name, value } = event.target;
    // console.log(name,value)
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      type,
      lookingFor,
      location,
      fee,
      coverURL,
      description,
    } = this.state;

    apiService
      .createProject(
        title,
        type,
        lookingFor,
        location,
        fee,
        coverURL,
        description
      )
      .then((response) => {
        console.log("createdProject", response.data);
        this.props.history.push(`/wusic/musicians/${this.props.user._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("coverURL", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/projectupload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ coverURL: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleLookingForSelect = (lookingFor) => {
    console.log(lookingFor);
    // const arr=artistType.map()
    this.setState({ lookingFor });
  };
  render() {
    const { lookingFor } = this.state;
    return (
      <div id="add-project">
      <img className="wusic-logo" src="/images/logo-wusic.svg" alt=""/>
        <div className="left">
          <img src="/images/add-project.svg" alt="" />
          <h1>CREATE PROJECT</h1>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <div className="middle">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control bar"
                name="title"
                value={this.state.title}
                onChange={this.handleText}
                placeholder="TITLE"
              />
              <label htmlFor="floatingInput">TITLE</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control bar"
                name="location"
                value={this.state.location}
                onChange={this.handleText}
                placeholder="LOCATION"
              />
              <label htmlFor="floatingInput">LOCATION</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control bar"
                name="fee"
                value={this.state.fee}
                onChange={this.handleText}
                placeholder="FEE"
              />
              <label htmlFor="floatingInput">FEE</label>
            </div>

            <div>
              <p className="label">TYPE</p>
              <div className="form-check radio">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Live"
                  name="type"
                  onChange={this.handleText}
                />
                <p className="radio">Live</p>
              </div>

              <div className="form-check radio">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Song production"
                  name="type"
                  onChange={this.handleText}
                />
                <p className="radio">Song production</p>
              </div>

              <div className="form-check radio">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Recording"
                  name="type"
                  onChange={this.handleText}
                />
                <p className="radio">Recording</p>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Movies&TV"
                  name="type"
                  onChange={this.handleText}
                />
                <p className="radio">Movies&TV</p>
              </div>
            </div>
            <div>
              <p className="label">LOOKING FOR</p>
              <Select
                value={lookingFor}
                onChange={this.handleLookingForSelect}
                options={this.state.lookingForOptions}
                isMulti
              />
            </div>
          </div>

          <div className="right">
            

            <div className="">
              <p className="label">COVER</p>
              <input
                type="file"
                className="form-control bar"
                name="coverURL"
                onChange={this.handleFileUpload}
                placeholder="COVER"
              />

              <img
                style={{ width: "100px" }}
                src={this.state.coverURL && this.state.coverURL}
                alt=""
                
              ></img>
            </div>

            <div className="form-floating mb-3">
              <textarea
                type="text"
                className="form-control"
                name="description"
                
                value={this.state.description}
                onChange={this.handleText}
                placeholder="DESCRIPTION"
              />
              <label htmlFor="floatingInput">DESCRIPTION</label>

              <button>CREATE</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(AddProject);
