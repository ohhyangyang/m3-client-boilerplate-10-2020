import React, { Component } from "react";
import apiService from "../lib/api-service";
import { withAuth } from "./../context/auth-context";
import { Link } from 'react-router-dom';

class ProjectDetail extends Component {
  state = {
    projectInfo: {},
    requested:false
  };
  componentDidMount() {
    apiService
      .getOneProject(this.props.match.params.projectId)
      .then((response) => {
        const projectInfo = response.data;
        // console.log(projectInfo);
        const {requests}=projectInfo
        
        // console.log(requests)
        // console.log(requests.includes(this.props.user._id))
        this.setState({
          projectInfo: projectInfo,
          requested:requests.includes(this.props.user._id)
        });
      });
  }
  getRequestInfo(){
      
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
  sendRequest=()=>{
      apiService.sendRequest(this.props.match.params.projectId,this.props.user._id)
        .then((response)=>{
            const updatedProject=response.data
            this.setState({
                requested:true
            })
        })
  }
  cancelRequest=()=>{
      apiService.cancelRequest(this.props.match.params.projectId,this.props.user._id)
      .then((response)=>{
        const updatedProject=response.data
        this.setState({
            requested:false
        })
    })
  }
  render() {
    return (
      <div>
        <div>
          <img src={this.state.projectInfo.coverURL} alt="" />
          {
              this.state.requested?
              (<div onClick={this.cancelRequest}>CANCEL YOUR REQUEST</div>)
              :(<div onClick={this.sendRequest}>SEND REQUEST</div>)
          }
          
        </div>

        <div>
          <h3>{this.state.projectInfo.title}</h3>
          <p>
            CREATED TIME:{" "}
            {this.state.projectInfo.created_at
              ? this.formatter.format(
                  Date.parse(this.state.projectInfo.created_at)
                )
              : null}
          </p>

          <div>
            <div>
              <p>
                {this.state.projectInfo.owner &&
                  this.state.projectInfo.owner.username}
              </p>
              {this.state.projectInfo.owner && (
                <Link to={`/wusic/musicians/${this.state.projectInfo.owner._id}`}>
                <img src={this.state.projectInfo.owner.profileURL} alt="" />
                </Link>
                

              )}
            </div>

            <p>TYPE: {this.state.projectInfo.type}</p>
            <p>
              LOOKING FOR:{" "}
              {this.state.projectInfo.lookingFor &&
                this.changeArrToString(this.state.projectInfo.lookingFor)}
            </p>
            <p>LOCATION: {this.state.projectInfo.location}</p>
            <p>FEE: {this.state.projectInfo.fee}</p>
            <p>DESCRIPTION:</p>
            <p>{this.state.projectInfo.description}</p>
          </div>
        </div>

        <div>
          <Link to="/wusic/projects">
          <img src="/images/whitearrow-left.png" alt=""/>
          <span>BACK</span>
          </Link>
          
        </div>
      </div>
    );
  }
}

export default withAuth(ProjectDetail);
