import React, { Component } from 'react'
import { CardContainer } from './Card'

export default class Welcome extends Component {
  render() {
    return (
    <CardContainer className="card">
        <div className="card-header">
            Welcome
        </div>
        <div className="card-body">
        <p className="card-text">Share and discuss the best/coolest piece of code you have ever seen!</p>
        </div>
    </CardContainer>
    )
  }
}