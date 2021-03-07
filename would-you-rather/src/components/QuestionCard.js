import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class QuestionCard extends Component {
  render() {
    const {question, avatar, author} = this.props

    return (
      <div className="dashboard-card"> <span> {author} asks: </span>
        <div className="card-flex">
          <img src={avatar} alt="Avatar" className="avatar" />
          <div className="userInfo">
            <h3 className="title">Would You Rather</h3>
            <p>...{question.optionOne.text}...</p>
            <Link to={`/questions/${question.id}`}> View Poll </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(QuestionCard);
