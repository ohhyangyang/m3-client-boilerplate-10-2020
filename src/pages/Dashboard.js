import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import apiService from "./../lib/api-service";
import OngoingProjectCard from "./../components/OngoingProjectCard";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    ongoingProjects: [],

    joinedProjects: [],
    likedUser: [],
  };
  getAllOfAUser = () => {
    console.log("update dashboard");
    apiService
      .getAllOfOneUser(this.props.user._id)
      .then((response) => {
        console.log("getAll", response.data);
        const allInfo = response.data;
        this.setState({
          ongoingProjects: allInfo.projectsOwned,
          joinedProjects: allInfo.projectsJoined,
          likedUser: allInfo.likedUsers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllOfAUser();
  }

  render() {
    return (
      <div id="dashboard">
        <img className="wusic-logo" src="/images/logo-wusic.svg" alt="" />
        <div className="ongoing-wrapper">
          <h3>YOUR ONGOING PROJECTS</h3>
          <div className="ongoingcards">
            {this.state.ongoingProjects.map((project) => {
              return (
                <OngoingProjectCard
                  key={project._id}
                  project={project}
                  updateDashboardInfo={this.getAllOfAUser}
                />
              );
            })}
          </div>
        </div>

        <div className="joined-wrapper">
          <h3>YOUR JOINED PROJECTS</h3>
          <div className="joinedcards-wrapper">
            {this.state.joinedProjects.map((project) => {
              return (
                <div className="joinedcard" key={project._id}>
                  <Link to={`/wusic/projects/${project._id}`}>
                    <img src={project.coverURL} alt="" />
                  </Link>
                  <p>{project.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="like-wrapper">
          <h3>YOUR SAVED ARTIST</h3>
          <div className="likecards-wrapper">
          {this.state.likedUser.map((user) => {
            return (
              <div  className="likecard" key={user._id}>
                <Link to={`/wusic/musicians/${user._id}`}>
                  <img src={user.profileURL} alt="" />
                </Link>

                <p>{user.username}</p>
              </div>
            );
          })}
          </div>
          
        </div>
      </div>
    );
  }
}

export default withAuth(Dashboard);
