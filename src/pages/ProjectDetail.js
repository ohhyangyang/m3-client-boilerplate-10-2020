import React, { Component } from "react";
import apiService from "../lib/api-service";
import { withAuth } from "./../context/auth-context";
import { Link } from "react-router-dom";

class ProjectDetail extends Component {
  state = {
    projectInfo: {},
    requested: false,
    participated:false
  };
  componentDidMount() {
    apiService
      .getOneProject(this.props.match.params.projectId)
      .then((response) => {
        const projectInfo = response.data;
 
        const { requests,participants } = projectInfo;

        this.setState({
          projectInfo: projectInfo,
          requested: requests.includes(this.props.user._id),
          participated: participants.includes(this.props.user._id)
        });
      });
  }
 


  formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  changeArrToString = (arr) => {
    const str = arr.join(", ");
    return str;
  };
  changeObjToString = (obj) => {
    const arr = obj.map((obj) => {
      return obj.value;
    });
    const str = arr.join(", ");
    return str;
  };
  sendRequest = () => {
    apiService
      .sendRequest(this.props.match.params.projectId, this.props.user._id)
      .then((response) => {
        // const updatedProject = response.data;
        this.setState({
          requested: true,
        });
      });
  };
  cancelRequest = () => {
    apiService
      .cancelRequest(this.props.match.params.projectId, this.props.user._id)
      .then((response) => {
        // const updatedProject = response.data;
        this.setState({
          requested: false,
        });
      });
  };
  render() {
    return (
      <div className="project-detail">
        <div className="left">
          <img src={this.state.projectInfo.coverURL} alt="" />
          {
            this.state.participated
          ?(<div className="joined-btn">JOINED</div>)
          :(this.state.requested ? (
            <div className="request-btn" onClick={this.cancelRequest}>CANCEL YOUR REQUEST</div>
          ) : (
            <div className="request-btn" onClick={this.sendRequest}>SEND REQUEST</div>
          ))
          }


          
        </div>

        <div className="right">
        <img className="wusic-logo" src="/images/logo-wusic.svg" alt=""/>
          <h3>{this.state.projectInfo.title}</h3>
          <p className="created-time">
            CREATED TIME:{" "}
            {this.state.projectInfo.created_at
              ? this.formatter.format(
                  Date.parse(this.state.projectInfo.created_at)
                )
              : null}
          </p>

          <div className="info">
            <div className="artist">
              <p className="name">
                {this.state.projectInfo.owner &&
                  this.state.projectInfo.owner.username}
              </p>
              {this.state.projectInfo.owner && (
                <Link
                  to={`/wusic/musicians/${this.state.projectInfo.owner._id}`}
                >
                  <img  className="profile-pic" src={this.state.projectInfo.owner.profileURL} alt="" />
                </Link>
              )}
            </div>

            <p className="text">TYPE: {this.state.projectInfo.type}</p>
            <p className="text">
              LOOKING FOR:{" "}
              {this.state.projectInfo.lookingFor &&
                this.changeObjToString(this.state.projectInfo.lookingFor)}
            </p>
            <p className="text">LOCATION: {this.state.projectInfo.location}</p>
            <p className="text">FEE: {this.state.projectInfo.fee}</p>
            <br/>
            <p className="text">DESCRIPTION:</p>
            <p className="text">{this.state.projectInfo.description}</p>
          </div>

          <div className="go-back">
            <Link to="/wusic/projects">
              <img src="/images/whitearrow-left.png" alt="" />
              <span>BACK</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(ProjectDetail);
