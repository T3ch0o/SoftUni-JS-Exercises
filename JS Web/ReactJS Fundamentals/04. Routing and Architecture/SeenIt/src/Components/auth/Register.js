import React, { Component } from 'react';

import dataCollector from '../../utils/dataCollector';
import requestHandler from '../../utils/requestHandler';

export default class Register extends Component {
    register(event) {
        event.preventDefault();
        this.setState({loading: true});
        requestHandler.register(this.state)
            .then(response => {
                localStorage.setItem('token', response._kmd.authtoken);
                localStorage.setItem('username', this.state.username);
                this.setState({loading: false, success: true});
                this.props.saveUser(this.state.username);
            });
    }

    render() {
        return (
            <form id="registerForm" onSubmit={this.register.bind(this)}>
                <h2>Register</h2>
                <label>Username:</label>
                <input name="username" type="text" onChange={dataCollector.bind(this)}/>
                <label>Password:</label>
                <input name="password" type="password" onChange={dataCollector.bind(this)}/>
                <label>Repeat Password:</label>
                <input name="repeatPass" type="password" onChange={dataCollector.bind(this)}/>
                <input id="btnRegister" value="Sign Up" type="submit"/>
            </form>
        );
    }
}