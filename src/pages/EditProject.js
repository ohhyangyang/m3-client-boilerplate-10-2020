import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import apiService from "./../lib/api-service";
import Select from "react-select";

class EditProject extends Component {
  state = {
    title: "",
    type: "",
    lookingFor: [],
    location: "",
    fee: "",
    coverURL: "",
    description: "",
    status: "",

    showConfirmation: false,

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

  componentDidMount() {
    const { projectId } = this.props.match.params;
    // console.log("projectId", projectId);
    apiService
      .getOneProject(projectId)
      .then((response) => {
        const {
          title,
          location,
          fee,
          coverURL,
          description,
          status,
        } = response.data;
        this.setState({
          title: title,
          location: location,
          fee: fee,
          coverURL: coverURL,
          description: description,
          status,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleText = (event) => {
    const { name, value } = event.target;
    // console.log(name,value)
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

  handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files);
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
        // console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ coverURL: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
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
      status,
    } = this.state;
    const { projectId } = this.props.match.params;

    apiService
      .updateProject(
        projectId,
        title,
        type,
        lookingFor,
        location,
        fee,
        coverURL,
        description,
        status
      )
      .then((response) => {
        // console.log("updatedProject", response.data);
        this.props.history.push(`/wusic/dashboard`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleStatus = () => {
    if (this.state.status === "open") {
      this.setState({
        status: "close",
      });
    } else {
      this.setState({
        status: "open",
      });
    }
  };
  handleDeleteConfirmation = () => {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
    });
  };
  handleDelete = () => {
    const { projectId } = this.props.match.params;
    apiService
      .deleteProject(projectId)
      .then(() => {
        this.props.history.push(`/wusic/dashboard`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleLookingForSelect = (lookingFor) => {
    // console.log(lookingFor);
    // const arr=artistType.map()
    this.setState({ lookingFor });
  };

  closeProject=()=>{
    apiService
      .closeOneProject(this.props.match.params.projectId)
      .then((response)=>{
        // console.log(response.data)
        this.setState({
          status:"close"
        })
      })
  }
  openProject=()=>{
    apiService
      .openOneProject(this.props.match.params.projectId)
      .then((response)=>{
        // console.log(response.data)
        this.setState({
          status:"open"
        })
      })
    
  }
  
  render() {
    const { lookingFor } = this.state;
    return (
      <div id="edit-project">
        <img className="wusic-logo" src="/images/logo-wusic.svg" alt="" />
        <div className="left">
          <img src="/images/edit-project.svg" alt="" />
          <h1>EDIT PROJECT</h1>
          <button
            className="delete-btn"
            onClick={this.handleDeleteConfirmation}
          >
            DELETE PROJECT
          </button>
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
              <p className="label">LOOKING FOR</p>
              <Select
                value={lookingFor}
                onChange={this.handleLookingForSelect}
                options={this.state.lookingForOptions}
                isMulti
              />
            </div>

            <div>
              <p className="label">TYPE</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Live"
                  name="type"
                  onChange={this.handleText}
                />
                Live
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Song production"
                  name="type"
                  onChange={this.handleText}
                />
                Song production
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Recording"
                  name="type"
                  onChange={this.handleText}
                />
                Recording
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Movies&TV"
                  name="type"
                  onChange={this.handleText}
                />
                Movies&TV
              </div>
            </div>
          </div>
          <div className="right">
            <div className="">
              <label className="label">COVER</label>
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
                className="profile-img"
              ></img>
            </div>

            <div className="form-floating mb-3">
              <textarea
                type="text"
                className="form-control"
                name="description"
                style={{ height: "100px" }}
                value={this.state.description}
                onChange={this.handleText}
                placeholder="DESCRIPTION"
              />
              <label htmlFor="floatingInput">MORE INFO</label>

              {/* <div className="open-confirmation">
                <p>OPEN FOR SEARCING?</p>
                <div onClick={this.handleStatus}>
                  {this.state.status == "open" ? "OPEN" : "CLOSE"}
                </div>
              </div> */}

              <div className="open-confirmation">
                <p>OPEN FOR SEARCING?</p>

                {this.state.status === "open" ? (
                  <div onClick={this.closeProject}>OPEN</div>
                ) : (
                  <div onClick={this.openProject}>CLOSE</div>
                )}
              </div>

              <button className="update-btn">UPDATE</button>
            </div>
          </div>
        </form>

        {this.state.showConfirmation ? (
          <div className="delete-wrapper">
            <div>
              <p>ARE YOU SURE YOU WANT TO DELETE THIS PROJECT?</p>
              <button onClick={this.handleDelete}>YES</button>
              <button onClick={this.handleDeleteConfirmation}>NO</button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withAuth(EditProject);
