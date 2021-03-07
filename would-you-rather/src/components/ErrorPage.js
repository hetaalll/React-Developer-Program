import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

class ErrorPage extends Component {
    state = {
        toHome: false,
    }

    goToHome = (e) => {
        e.preventDefault();
        this.setState(() => ({
          toHome: true,
        }))
    }

    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/' />
          }
        return (
            <div className="error-page">
                <h1 className="four-of-four">&#9679; 404 &#9679;</h1>
                <p>Oops! Page Not Found &#128557;</p>
                <button className="error-btn" onClick={this.goToHome}>Go back Home</button>
            </div>
        )
    }
}

export default ErrorPage