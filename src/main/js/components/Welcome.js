import React, { Component } from "react";
import { CardContainer } from "./Card";

export default class Welcome extends Component {
  render() {
    return (
      <CardContainer className="card">
        <div className="card-header blue">
          Welcome
        </div>
        <div className="card-body rounded">
          <p className="card-text">
            Share and discuss the coolest pieces of code you have ever seen!
          </p>
        </div>
      </CardContainer>
    );
  }
}
