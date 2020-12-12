import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import apiService from "./../lib/api-service";
import { Link } from "react-router-dom";

class ProjectList extends Component {
  state = {
    allProjects: [],
    filteredProjects: [],
    type: "All",
    lookingFor: "All",
  };

  componentDidMount() {
    this.getAllProjects();
  }

  getAllProjects = () => {
    apiService.getAllProjects().then((response) => {
      console.log("here",response.data);
      const openProject = response.data.filter((project=>{
        return project.status=="open" && project.owner._id!=this.props.user._id
      }))
      this.setState({
        allProjects: openProject,
        filteredProjects: openProject,
      });
    });
  };

  handleFilter = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    this.setState({
      [name]: value,
    });
  };

  filterProjects=(event)=>{
    event.preventDefault();
    
    console.log(this.state.lookingFor)
    console.log()
    const filtered = this.state.allProjects.filter((project)=>{
      if(this.state.type=='All' && this.state.lookingFor!='All'){
        return project.lookingFor.includes(this.state.lookingFor)
      }else if(this.state.type!='All' && this.state.lookingFor=='All'){
        return project.type.includes(this.state.type)
      }else if(this.state.type=='All' && this.state.lookingFor=='All'){
        return true
      }else if(this.state.type!='All' && this.state.lookingFor!='All'){
        return project.type.includes(this.state.type) && project.lookingFor.includes(this.state.lookingFor)
      }
    })
    console.log(filtered)
    this.setState({
      filteredProjects:filtered
    })
  }

  render() {
    return (
      <div>
        <div>
          <h2>ALL YOU NEED IS MAKING MUSIC</h2>
          <form onSubmit={this.filterProjects}>
            <div>
              <p>PROJECT TYPE</p>
              <select
                className="form-select"
                name="type"
                onChange={this.handleFilter}
              >
                <option value="All">All</option>
                <option value="Live">Live</option>
                <option value="Song production">Song production</option>
                <option value="Recording">Recording</option>
                <option value="Movies&TV">Movies&TV</option>
              </select>
            </div>

            <div>
              <p>LOOKING FOR</p>
              <select
                className="form-select"
                name="lookingFor"
                onChange={this.handleFilter}
              >
                <option value="All">All</option>
                <option value="Singer">Singer</option>
                <option value="Rapper">Rapper</option>
                <option value="Composer">Composer</option>
                <option value="Mixing engineers">Mixing engineers</option>
                <option value="Producer">Producer</option>
                <option value="Songwriter">Songwriter</option>
                <option value="Sound designer">Sound designer</option>
                <option value="Beatmaker">Beatmaker</option>
                <option value="Guitar">Guitar</option>
                <option value="Piano">Piano</option>
                <option value="Accordion">Accordion</option>
                <option value="Sax">Sax</option>
                <option value="Violin">Violin</option>
                <option value="Horn">Horn</option>
                <option value="Bass">Bass</option>
                <option value="Drum">Drum</option>
                <option value="Trumpet">Trumpet</option>
                <option value="Ukelele">Ukelele</option>
                <option value="Keyboard">Keyboard</option>
              </select>
            </div>

            <button>SEARCH</button>
          </form>
        </div>

        <div>
          {this.state.filteredProjects.map((project) => {
            return (
              <Link key={project._id} to={`/wusic/projects/${project._id}`}>
                <img src={project.coverURL} alt="" />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withAuth(ProjectList);
