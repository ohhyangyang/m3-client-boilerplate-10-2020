import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import apiService from "./../lib/api-service";

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
  };

  componentDidMount() {
    const { projectId } = this.props.match.params;
    console.log("projectId", projectId);
    apiService.getOneProject(projectId).then((response) => {
      console.log("response.data", response.data);
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
    .catch((err)=>{
      console.log(err)
    })
  }
  handleText = (event) => {
    const { name, value } = event.target;
    // console.log(name,value)
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
        return type != value;
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
      .post("http://localhost:5000/api/projectupload", uploadData, {
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
        console.log("updatedProject", response.data);
        this.props.history.push(`/wusic/musicians`);
      })
      .catch((err)=>{
        console.log(err)
      })
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
    apiService.deleteProject(projectId)
      .then(()=>{
        this.props.history.push(`/wusic/musicians`);
      })
      .catch((err)=>{
        console.log(err)
      })
  };
  render() {
    return (
      <div>
        <h1>EDIT PROJECT</h1>
        <button onClick={this.handleDeleteConfirmation}>DELETE PROJECT</button>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
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
              className="form-control"
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
              className="form-control"
              name="fee"
              value={this.state.fee}
              onChange={this.handleText}
              placeholder="FEE"
            />
            <label htmlFor="floatingInput">FEE</label>
          </div>

          <div>
            <p>TYPE</p>
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

          <div>
            <p>LOOKING FOR</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Singer"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Singer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Rapper"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Rapper
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Composer"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Composer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Mixing engineers"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Mixing engineers
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Producer"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Producer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Songwriter"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Songwriter
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Sound designer"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Sound designer
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Beatmaker"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Beatmaker
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Guitar"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Guitar
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Piano"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Piano
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Accordion"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Accordion
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Sax"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Sax
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Violin"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Violin
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Horn"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Horn
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Bass"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Bass
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Drum"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Drum
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Trumpet"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Trumpet
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Ukelele"
                name="lookingFor"
                onChange={this.handleCheckbox}
              />
              Ukelele
            </div>

            <div className="">
              <label>COVER</label>
              <input
                type="file"
                className="form-control"
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
                style={{ height: "100px" }}
                value={this.state.description}
                onChange={this.handleText}
                placeholder="DESCRIPTION"
              />
              <label htmlFor="floatingInput">MORE INFO</label>

              <div>
                <p>OPEN FOR SEARCING?</p>
                <div onClick={this.handleStatus}>
                  {this.state.status == "open" ? "OPEN" : "CLOSE"}
                </div>
              </div>

              <input type="submit" value="UPDATE" />
            </div>
          </div>
        </form>

        {this.state.showConfirmation ? (
          <div>
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
