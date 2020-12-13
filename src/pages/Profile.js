import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import apiService from "./../lib/api-service";
import { Link } from "react-router-dom";
import SpotifyPlayer from "react-spotify-player";

class Profile extends Component {
  state = {
    userId: "",
    visitorId: "",
    userInfo: {},
    // likedUsers:[],
    beingLiked: false,
  };

  componentDidMount() {
    const { userId } = this.props.match.params;
    // console.log("userID",userId)
    const { user } = this.props;
    const visitorId = user._id;

    // console.log("visitorId",visitorId)
    this.getUserInfo();
    this.getLikeInfo();

    this.setState({
      userId: userId,
      visitorId: visitorId,
    });
  }

  getUserInfo = () => {
    apiService
      .getAllOfOneUser(this.props.match.params.userId)
      .then((response) => {
        const userInfo = response.data;
        this.setState({
          userInfo: userInfo,
        });
      });
  };

  getLikeInfo = () => {
    apiService.getAllOfOneUser(this.props.user._id).then((response) => {
      const { likedUsers } = response.data;
      // likedUsers.includes(this.props.match.params.userId)
      // console.log(likedUsers)
      const likedUserId = likedUsers.map((user) => {
        return user._id;
      });
      // console.log(likedUserId)
      this.setState({
        beingLiked: likedUserId.includes(this.props.match.params.userId),
      });
    });
  };
  changeToString = (obj) => {
    const arr = obj.map((obj) => {
      return obj.value;
    });
    const str = arr.join(", ");
    return str;
  };

  handleLike = () => {
    apiService.likeOneUser(this.state.userId);
    this.setState({
      beingLiked: true,
    });
  };

  handleDisLike = () => {
    apiService.disLikeOneUser(this.state.userId);
    this.setState({
      beingLiked: false,
    });
  };

  render() {
    return (
      <div id="profile">
        <div className="left">
          <div className="player-wrapper">
            <p>MUSIC PLAYER</p>

            {this.state.userInfo.spotifyLink?(<SpotifyPlayer
              uri={this.state.userInfo.spotifyLink}
              // size={{ width: "100%", height: '300' }}
              view="list"
              theme="black"
            />):<p className="emptybox">The player box is still empty</p>}
            
          </div>

          {/* {this.state.userId == this.state.visitorId ?
          null
          :(
            <div>
            <Link to="/wusic/musicians">
              <img src="/images/whitearrow-left.png" alt="" />
              <span>BACK</span>
            </Link>
          </div> 
          )

          }*/}
        </div>

        <div className="middle">
          <div className="middle-width">
            <h2>{this.state.userInfo.username}</h2>
            <div>
              <p className="type">
                {this.state.userInfo.artistType
                  ? this.changeToString(this.state.userInfo.artistType)
                  : null}
              </p>
              <p className="text">{this.state.userInfo.location}</p>
            </div>

            <div className="little-logos">
              {this.state.userId == this.state.visitorId ? null : this.state
                  .beingLiked ? (
                <img
                  onClick={this.handleDisLike}
                  src="/images/like.png"
                  alt=""
                />
              ) : (
                <img
                  onClick={this.handleLike}
                  src="/images/unlike.png"
                  alt=""
                />
              )}

              <a target="_blank" href={this.state.userInfo.spotifyLink}>
                <img src="/images/spotify.svg" alt="" />
              </a>
            </div>
          </div>

          <div className="middle-width black-border">
            <p className="text">GENRE :</p>
            <p className="text">{this.state.userInfo.genre}</p>
          </div>

          <div className="middle-width black-border">
            <p className="text">INSTRUMENT :</p>
            <p className="text">
              {this.state.userInfo.instrument
                ? this.changeToString(this.state.userInfo.instrument)
                : null}
            </p>
          </div>

          <div className="middle-width black-border">
            <p className="text">CONTACT :</p>
            <p className="text">{this.state.userInfo.email}</p>
          </div>

          {this.state.userId == this.state.visitorId ? (
            <div className="edit-create middle-width" >
              <Link to="/wusic/edit-profile">
                <p>EDIT PROFILE</p>
                <img src="/images/arrow-right.png" alt="" />
              </Link>
              <Link to="/wusic/add-project">
                <p>CREATE PROJECT</p>
                <img src="/images/arrow-right.png" alt="" />
              </Link>
            </div>
          ) : null}
        </div>

        <div className="right">
        <img className="wusic-logo" src="/images/logo-wusic.svg" alt=""/>
          <img className="profilePic" src={this.state.userInfo.profileURL} alt="" />
          <p>{this.state.userInfo.description}</p>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
