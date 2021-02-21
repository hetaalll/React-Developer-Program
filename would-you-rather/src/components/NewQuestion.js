import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleOptionOne = (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({
      optionOneText
    }))
  }

  handleOptionTwo = (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
    console.log(this.state)
    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="modal">
        <form className="modal-content" onSubmit={this.handleSubmit}>
            <div className="container">
                <p>Create New Question</p> <hr />
                <span style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}><b>Would You Rather...</b></span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter option one text"
                    value ={this.state.optionOneText}
                    onChange={this.handleOptionOne}
                  />
                <br/>
                <span style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}><b>OR</b></span>
                <br/>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter option one text"
                  value ={this.state.optionTwoText}
                  onChange={this.handleOptionTwo}
                />
                <button type="submit">Submit</button>
            </div>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion);
