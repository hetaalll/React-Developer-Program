import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        authedUser: ''
    }

    setSelectedUser = (e) => {
        const authedUser = e.target.value
        this.setState(() => ({ authedUser }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const authedUser = this.state.authedUser
        dispatch(setAuthedUser(authedUser))
    }

    render() {
        return (
            <div className="modal">
                <form className="modal-content" onSubmit={this.handleSubmit}>
                    <div className="container">
                        <h3>Would You Rather</h3>
                        <select onChange={this.setSelectedUser}  defaultValue='none'>
                            <option value="none" disabled hidden>Select User</option>
                            {this.props.users.map(({name, id}) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                        <button className="form-btn" type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(Login)