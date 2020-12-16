import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import apiService from "./../lib/api-service";
// import { Redirect } from "react-router";
import Select from "react-select";

class EditProfile extends Component {
  state = {
    username: "",

    email: "",
    profileURL: "",
    description: "",
    location: "",
    genre: "",
    artistType: [],
    instrument: [],
    spotifyLink: "",
    spotifyEmbed: "",

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
      { value: "Keyboard", label: "Keyboard" },
    ],
  };
  componentDidMount() {
    // 获取数据库中该用户数据
    // console.log("this.props.user._id", this.props.user._id);
    apiService
      .getOneUser(this.props.user._id)
      .then((response) => {
        // console.log("response.data", response.data);
        const {
          username,

          email,
          profileURL,
          description,
          location,
          genre,

          spotifyLink,
          spotifyEmbed,
        } = response.data;
        this.setState({
          username: username,

          email: email,
          profileURL: profileURL,
          description: description,
          location: location,
          genre: genre,

          spotifyLink: spotifyLink,
          spotifyEmbed: spotifyEmbed,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //更新state
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      username,

      email,
      profileURL,
      description,
      location,
      genre,
      artistType,
      instrument,
      spotifyLink,
      spotifyEmbed,
    } = this.state;

    const userId = this.props.user._id;
    apiService
      .updateUser(
        userId,
        username,
        email,
        profileURL,
        description,
        location,
        genre,
        artistType,
        instrument,
        spotifyLink,
        spotifyEmbed
      )
      .then((response) => {
        // console.log("updateUser", response.data);
        this.props.history.push(`/wusic/musicians/${this.props.user._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
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

  handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("profileURL", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/userupload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ profileURL: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
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
    const {
      username,

      email,
      description,
      location,
      genre,
  
      spotifyLink,
    } = this.state;

    const { artistType, instrument } = this.state;
    return (
      <div id="edit-profile">
        <img className="wusic-logo" src="/images/logo-wusic.svg" alt="" />
        <div className="left">
          <img src="/images/edit-profile.svg" alt="" />
          <h1>EDIT PROFILE</h1>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          <div className="middle">
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
            <div>
              <p className="label">ARTIST TYPE</p>
              <Select
                value={artistType}
                onChange={this.handleTypeSelect}
                options={this.state.artistTypeOptions}
                isMulti
              />
            </div>

            <div>
              <p className="label">INSTRUMENT</p>
              <Select
                value={instrument}
                onChange={this.handleInstrumentSelect}
                options={this.state.instrumentOptions}
                isMulti
              />
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control space"
                name="location"
                value={location}
                onChange={this.handleText}
                placeholder="LOCATION"
              />
              <label htmlFor="floatingInput">LOCATION</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="genre"
                value={genre}
                onChange={this.handleText}
                placeholder="GENRE"
              />
              <label htmlFor="floatingInput">GENRE</label>
            </div>
          </div>

          <div className="right">
            <div>
              <label className="label">PROFILE PHOTO</label>
              <input
                type="file"
                className="form-control"
                name="profileURL"
                onChange={this.handleFileUpload}
                placeholder="PROFILE PHOTO"
              />

              <img
                style={{ width: "100px" }}
                src={this.state.profileURL && this.state.profileURL}
                alt=""
                className="profile-img"
              ></img>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="spotifyLink"
                value={spotifyLink}
                onChange={this.handleText}
                placeholder="SPOTIFY LINK"
              />
              <label htmlFor="floatingInput">SPOTIFY LINK</label>
            </div>
            {/* <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="spotifyEmbed"
              value={spotifyEmbed}
              onChange={this.handleText}
              placeholder="SPOTIFY EMBED"
            />
            <label htmlFor="floatingInput">SPOTIFY EMBED</label>
          </div> */}
            <div className="form-floating mb-3">
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={this.handleText}
                placeholder="DESCRIPTION"
              />
              <label htmlFor="floatingInput">DESCRIPTION</label>
            </div>

            <button>UPDATE</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(EditProfile);
