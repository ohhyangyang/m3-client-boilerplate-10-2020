import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import apiService from "./../lib/api-service";
import OngoingProjectCard from "./../components/OngoingProjectCard";
import JoinedProjectCard from "./../components/JoinedProjectCard";
import LikedMusicianCard from "./../components/LikedMusicianCard";
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

        <h3>YOUR JOINED PROJECTS</h3>
        <div>
          {this.state.joinedProjects.map((project) => {
            return (
              <div>
                <Link to={`/wusic/projects/${project._id}`}>
                  <img src={project.coverURL} alt="" />
                </Link>
                <p>{project.title}</p>
              </div>
            );
          })}
        </div>

        <div>
          <h3>YOUR SAVED ARTIST</h3>
          {this.state.likedUser.map((user) => {
            return (
              <div key={user._id}>
                <Link to={`/wusic/musicians/${user._id}`}>
                  <img src={user.profileURL} alt="" />
                </Link>

                <p>{user.username}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withAuth(Dashboard);
