import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div id="about">
        <h1>A HUMAN TOUCH IN MUSICIANS' WORLD</h1>
        <p>
          <strong>Wusic</strong> is a platform helping users to find a suitable
          musician for a project, or reverse.
        </p>
        <p>
          There are lots of musicians available worldwide. But, there is limited
          access to these people to contact and invite them to become a member
          of a project or a band. Wusic will help musicians to find their place
          and make music with others.
        </p>
        <img className="wusic-logo" src="/images/logo-wusic.svg" alt="" />
      </div>
    );
  }
}
