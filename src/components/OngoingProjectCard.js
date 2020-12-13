import React, { Component } from "react";
import apiService from "./../lib/api-service";
import { Link } from "react-router-dom";
export default class OngoingProjectCard extends Component {
  state = {
    hideRequests: true,
    image: "/images/whitearrow-down.png",
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
    console.log(projectId);
    console.log(userId);
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
        image: "/images/whitearrow-up.png",
      });
    } else {
      this.setState({
        hideRequests: true,
        image: "/images/whitearrow-down.png",
      });
    }
  };
  deleteProject = (projectId) => {
    apiService
      .deleteProject(projectId)
      .then(() => {
        this.props.updateDashboardInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    console.log(this.props.project);
    return (
      <div id="card-wrapper">
      <div className="cover-title">
            <p>{this.props.project.title}</p>
          </div>
        <div className="black-border">
          

          <div className="cover-container">
            <div className="cover-wrapper">
              <img className="cover" src={this.props.project.coverURL} alt="" />
            </div>

            <div className="edit-delete-wrapper">
              <Link to={`/wusic/edit-project/${this.props.project._id}`}>
                <p>EDIT</p>
              </Link>
              <p onClick={() => this.deleteProject(this.props.project._id)}>
                DELETE
              </p>
            </div>
          </div>

          <div className="participants-wrapper">
            {console.log(this.props.project.participants)}
            {this.props.project.participants.map((participant) => {
              console.log("participant", participant);
              return (
                <div className="circle">
                  <img
                    className="request"
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
              <div className="requests-wrapper" key={request._id}>
                <div className="circle">
                  <img className="request" src={request.profileURL} alt="" />
                </div>

                <div>
                  <p className="name">{request.username}</p>
                  <p className="type">
                    {this.changeToString(request.artistType)}
                  </p>
                </div>
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
            );
          })}

          {this.state.hideRequests
            ? null
            : this.props.project.requests.slice(2).map((request) => {
                return (
                  <div className="requests-wrapper" key={request._id}>
                    <div className="circle">
                      <img
                        className="request"
                        src={request.profileURL}
                        alt=""
                      />
                    </div>

                    <div>
                      <p className="name">{request.username}</p>
                      <p className="type">
                        {this.changeToString(request.artistType)}
                      </p>
                    </div>
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
                );
              })}

          {this.props.project.requests.length > 2 ? (
            <div className="expand-logo-wrapper" onClick={this.handleExpand}>
              <img className="expand-logo" src={this.state.image} alt="" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
