import React, { Component } from "react";

export default class OngoingProjectCard extends Component {
  state = {
    title: "",
    image: "",
    participants: [],
    requests: [],
  };
  componentDidMount() {
    this.setState({
      title: this.props.project.title,
      image: this.props.project.coverURL,
      participants: this.props.project.participants,
      requests: this.props.project.requests,
    });
  }
  render() {
    console.log(this.props.project);
    return (
      <div>
        <p>{this.state.title}</p>
        <img src={this.state.image} alt=""/>
      </div>
    );
  }
}
