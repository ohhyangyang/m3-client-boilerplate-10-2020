import React, { Component } from "react";
import apiService from "./../lib/api-service";
import { Link } from "react-router-dom";
export default class OngoingProjectCard extends Component {
  state = {
    hideRequests: true,
    image: "/images/whitearrow-down.png",
  };
  changeToString = (obj) => {
    const arr=obj.map((obj)=>{
      return obj.value
    })
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
  deleteProject=(projectId)=>{
      apiService.deleteProject(projectId)
        .then(()=>{
            this.props.updateDashboardInfo();
        })
        .catch((err) => {
            console.log(err);
          });
  }
  render() {
    console.log(this.props.project);
    return (
      <div>
        <p>{this.props.project.title}</p>
        <div>
        <img src={this.props.project.coverURL} alt="" />
        <Link to={`/wusic/edit-project/${this.props.project._id}`}>
            <p>EDIT</p>
        </Link>
        <p onClick={()=>this.deleteProject(this.props.project._id)}>
            DELETE
        </p>
        </div>
        
        <div>
          {console.log(this.props.project.participants)}
          {this.props.project.participants.map((participant) => {
            console.log("participant", participant);
            return (
              <img key={participant._id} src={participant.profileURL} alt="" />
            );
          })}
        </div>
        <div>
          {this.props.project.requests.slice(0, 2).map((request) => {
            return (
              <div key={request._id}>
                <img src={request.profileURL} alt="" />

                <div>
                  <p>{request.username}</p>
                  <p>{this.changeToString(request.artistType)}</p>
                </div>
                <img
                  src="/images/accept white.png"
                  alt=""
                  onClick={() =>
                    this.handleAcceptation(this.props.project._id, request._id)
                  }
                />
                <img
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
                  <div key={request._id}>
                    <img src={request.profileURL} alt="" />
                    <div>
                      <p>{request.username}</p>
                      <p>{this.changeToString(request.artistType)}</p>
                    </div>
                    <img
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
            <div onClick={this.handleExpand}>
              <img src={this.state.image} alt="" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
