import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import apiService from "./../lib/api-service";
import { Link } from "react-router-dom";

class MusicianList extends Component {
  state = {
    allMusicians: [],
    filteredMusicians: [],
    artistType: "All",
    instrument: "All",
  };
  componentDidMount() {
    this.getAllMusicians();
  }
  getAllMusicians = () => {
    apiService.getAllUsers().then((response) => {
      //   console.log(response.data)
      this.setState({
        allMusicians: response.data,
        filteredMusicians: response.data
      });
    });
  };

  filterMusician = (event) => {
    event.preventDefault();
    // console.log(musician.artistType)

    const filtered = this.state.allMusicians.filter((musician) => {
      if (this.state.artistType == "All" && this.state.instrument != "All") {
        return musician.instrument.includes(this.state.instrument);
      } else if (
        this.state.artistType != "All" &&
        this.state.instrument == "All"
      ) {
        return musician.artistType.includes(this.state.artistType);
      } else if (
        this.state.artistType == "All" &&
        this.state.instrument == "All"
      ) {
        return true;
      } else if (
        this.state.artistType != "All" &&
        this.state.instrument != "All"
      ) {
        return (
          musician.artistType.includes(this.state.artistType) &&
          musician.instrument.includes(this.state.instrument)
        );
      }
    });
    console.log(filtered);
    this.setState({
      filteredMusicians: filtered
    });
  };

  handleFilter = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <div>
          <h2>HELP, I NEED SOMEBODY!</h2>

          <form onSubmit={this.filterMusician}>
            <div>
              {/* {console.log(this.state.instrument)} */}
              <p>ARTIST TYPE</p>
              <select
                className="form-select"
                name="artistType"
                onChange={this.handleFilter}
              >
                <option value="All">All</option>
                <option value="Singer">Singer</option>
                <option value="Rapper">Rapper</option>
                <option value="Composer">Composer</option>
                <option value="Mixing engineer">Mixing engineer</option>
                <option value="Producer">Producer</option>
                <option value="Songwriter">Songwriter</option>
                <option value="Sound designer">Sound designer</option>
                <option value="Beatmaker">Beatmaker</option>
              </select>
            </div>

            <div>
              <p>INSTRUMENT</p>
              <select
                className="form-select"
                name="instrument"
                onChange={this.handleFilter}
              >
                <option value="All">All</option>
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
          {this.state.filteredMusicians.map((musician) => {
            
            return (
              <Link key={musician._id} to={`/wusic/musicians/${musician._id}`}>
                <img  src={musician.profileURL} alt="" />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withAuth(MusicianList);
