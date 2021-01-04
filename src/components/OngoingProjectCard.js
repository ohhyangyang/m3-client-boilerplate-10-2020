import React, { Component } from "react";
import apiService from "./../lib/api-service";
import { Link } from "react-router-dom";
export default class OngoingProjectCard extends Component {
  state = {
    hideRequests: true,
    image: "/images/blackarrow-down.png",
  };
  changeToString = (obj) => {
    const arr = obj.map((obj) => {
      return obj.value;
    });
    const str = arr.join(", ");
    return str;
  };
  handleAcceptation = (projectId, userId) => {
    apiService
      .acceptRequest(projectId, userId)
      .then((response) => {
        //  console.log("updatedProject",response.data)
        this.props.updateDashboardInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleRejection = (projectId, userId) => {
    // console.log(projectId);
    // console.log(userId);
    apiService
      .rejectRequest(projectId, userId)
      .then((response) => {
        this.props.updateDashboardInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleExpand = () => {
    if (this.state.hideRequests) {
      this.setState({
        hideRequests: false,
        image: "/images/blackarrow-up.png",
      });
    } else {
      this.setState({
        hideRequests: true,
        image: "/images/blackarrow-down.png",
      });
    }
  };

  render() {
    // console.log(this.props.project);
    return (
      <div className="project-cards__for-scroll">
      <div className="project-cards__item">
        <div className="title">
          <p>{this.props.project.title}</p>
        </div>
        <div className="black-border">
          <div className="img-container">
            {this.props.project.coverURL ? (
              <img className="img" src={this.props.project.coverURL} alt="" />
            ) : (
              <img
                className="img"
                src="https://res.cloudinary.com/domkvddv0/image/upload/v1608194313/m3-wusic/default_user_image_iqfeza.jpg"
                alt=""
              />
            )}
          </div>

          <div className="edit-btn">
            <Link to={`/wusic/edit-project/${this.props.project._id}`}>
              <p>EDIT</p>
            </Link>
            {/* <p onClick={() => this.deleteProject(this.props.project._id)}>
                DELETE
              </p> */}
          </div>

          <div className="participants-container">
            {/* {console.log(this.props.project.participants)} */}
            {this.props.project.participants.map((participant) => {
              return (
                <div key={participant._id} className="round-img">
                  <img
                    key={participant._id}
                    src={participant.profileURL}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="requests-container">
          {this.props.project.requests.slice(0, 2).map((request) => {
            return (
              <div className="request-shown" key={request._id}>
                <div className="round-img">
                  <img src={request.profileURL} alt="" />
                </div>

                <div className="info">
                  <p className="name">{request.username}</p>
                  <p className="type">
                    {this.changeToString(request.artistType)}
                  </p>
                </div>
                <div>
                <img
                  className="confirm"
                  src="/images/accept white.png"
                  alt=""
                  onClick={() =>
                    this.handleAcceptation(this.props.project._id, request._id)
                  }
                />
                <img
                  className="confirm"
                  src="/images/refuse white.png"
                  alt=""
                  onClick={() =>
                    this.handleRejection(this.props.project._id, request._id)
                  }
                />
                </div>
              </div>
            );
          })}

          {this.state.hideRequests
            ? null
            : this.props.project.requests.slice(2).map((request) => {
                return (
                  <div className="request-hidden" key={request._id}>
                    <div className="round-img">
                      <img
                        
                        src={request.profileURL}
                        alt=""
                      />
                    </div>

                    <div className="info">
                      <p className="name">{request.username}</p>
                      <p className="type">
                        {this.changeToString(request.artistType)}
                      </p>
                    </div>

                    <div>
                      
                    <img
                      className="confirm"
                      src="/images/accept white.png"
                      alt=""
                      onClick={() =>
                        this.handleAcceptation(
                          this.props.project._id,
                          request._id
                        )
                      }
                    />
                    <img
                      className="confirm"
                      src="/images/refuse white.png"
                      alt=""
                      onClick={() =>
                        this.handleRejection(
                          this.props.project._id,
                          request._id
                        )
                      }
                    />
                    </div>
                  </div>
                );
              })}

          {this.props.project.requests.length > 2 ? (
            <div className="expand-logo" onClick={this.handleExpand}>
              <img src={this.state.image} alt="" />
            </div>
          ) : null}
        </div>
        </div>
      </div>
    );
  }
}
