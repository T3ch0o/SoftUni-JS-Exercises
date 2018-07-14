import React, {Component} from 'react';

import dataCollector from '../../utils/dataCollector';
import requestHandler from '../../utils/requestHandler';

export default class Login extends Component {
    login(event) {
        event.preventDefault();
        this.setState({loading: true});
        requestHandler.login(this.state)
            .then(response => {
                localStorage.setItem('token', response._kmd.authtoken);
                localStorage.setItem('username', this.state.username);
                this.setState({loading: false, success: true, redirectToReferrer: true});
                this.props.saveUser(this.state.username);
            });
    }

    render() {
        return (
            <form id="loginForm" onSubmit={this.login.bind(this)}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" type="text" onChange={dataCollector.bind(this)}/>
                <label>Password:</label>
                <input name="password" type="password" onChange={dataCollector.bind(this)}/>
                <input id="btnLogin" value="Sign In" type="submit"/>
            </form>
        );
    }
}