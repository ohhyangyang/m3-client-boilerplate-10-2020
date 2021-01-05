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

      const allMusicians = response.data.filter((musician) => {
        return musician._id !== this.props.user._id;
      });
      this.setState({
        allMusicians: allMusicians,
        filteredMusicians: allMusicians,
      });
    });
  };

  filterMusician = (event) => {
    event.preventDefault();

    const filtered = this.state.allMusicians.filter((musician) => {
      if (this.state.artistType === "All" && this.state.instrument !== "All") {
        const instrumentArr = musician.instrument.map((instrument) => {
          return instrument.value;
        });
        return instrumentArr.includes(this.state.instrument);
      } else if (
        this.state.artistType !== "All" &&
        this.state.instrument === "All"
      ) {
        const typeArr = musician.artistType.map((type) => {
          return type.value;
        });
        return typeArr.includes(this.state.artistType);
      } else if (
        this.state.artistType === "All" &&
        this.state.instrument === "All"
      ) {
        return true;
      } else if (
        this.state.artistType !== "All" &&
        this.state.instrument !== "All"
      ) {
        const typeArr = musician.artistType.map((type) => {
          return type.value;
        });
        const instrumentArr = musician.instrument.map((instrument) => {
          return instrument.value;
        });
        return (
          typeArr.includes(this.state.artistType) &&
          instrumentArr.includes(this.state.instrument)
        );
      }
    });
    console.log(filtered);
    this.setState({
      filteredMusicians: filtered,
    });
  };

  handleFilter = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    this.setState({
      [name]: value,
    });
  };

  toggleFilters = () => {
    this.form.classList.toggle("open");
    this.toggleBtn.classList.toggle("open");
  };

  render() {
    return (
      <div className="musician-list">
        <div className="nav">
          <h2>HELP, I NEED SOMEBODY!</h2>

          <div className="toggle-filters">
            <p>FILTERS</p>
            <div ref={(btn) => (this.toggleBtn = btn)} onClick={this.toggleFilters}>
              <img src="/images/plus.svg" alt="" />
            </div>
          </div>
          <form
            onSubmit={this.filterMusician}
            ref={(form) => (this.form = form)}
          >
            <div>
 
              <p>ARTIST TYPE</p>
              <select
                className=""
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
                className=""
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

        <div className="main-container">
          <div className="main">
            {this.state.filteredMusicians.map((musician) => {
              return (
                <Link
                  key={musician._id}
                  to={`/wusic/musicians/${musician._id}`}
                >
                  <img src={musician.profileURL} alt="" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(MusicianList);
