import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div>Dashboard Component</div>
    )
  }
}

export default connect()(Dashboard);
