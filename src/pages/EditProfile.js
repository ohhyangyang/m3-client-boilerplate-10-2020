import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import apiService from "./../lib/api-service";
// import { Redirect } from "react-router";

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
  };
  componentDidMount() {
    // 获取数据库中该用户数据
    // console.log("this.props.user._id", this.props.user._id);
    apiService.getOneUser(this.props.user._id).then((response) => {
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
    .catch((err)=>{
      console.log(err)
    })
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
    apiService.updateUser(
      userId,
      username,email, profileURL, description, location, genre, artistType, instrument, spotifyLink, spotifyEmbed
    ).then((response)=>{
      console.log("updateUser",response.data)
      this.props.history.push(`/wusic/musicians/${this.props.user._id}`)

    })
    .catch((err)=>{
      console.log(err)
    })
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

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];

    const uploadData = new FormData();
    // image => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new project in '/api/projects' POST route
    uploadData.append("profileURL", file);

    axios
      .post("http://localhost:5000/api/userupload", uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ profileURL: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  

  render() {
    const {
      username,
      
      email,
      description,
      location,
      genre,
      spotifyEmbed,
      spotifyLink,
    } = this.state;
    return (
      <div>
        <h1>EDIT PROFILE</h1>
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

          <div>
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
          </div>

          <div className="">
          <label>PROFILE PHOTO</label>
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
            ></img>
          </div>
          

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
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
              style={{ height: "100px" }}
              value={description}
              onChange={this.handleText}
              placeholder="DESCRIPTION"
            />
            <label htmlFor="floatingInput">DESCRIPTION</label>
          </div>

          <button>UPDATE</button>
        </form>
      </div>
    );
  }
}

export default withAuth(EditProfile);
