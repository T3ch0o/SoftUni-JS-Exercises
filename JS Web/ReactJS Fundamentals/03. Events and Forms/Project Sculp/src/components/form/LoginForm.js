import React, {Component} from 'react';

import validationFunc from './../../utils/loginFormValidator';
import Input from './formFields/Input';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    submitLogin(event) {
        event.preventDefault();
        const payload = {
            email: this.state.email,
            password: this.state.password
        };

        this.login(payload)
    }

    login(payload) {
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then((data) => {
                if (!data.success) {
                    this.setState({ error: data.message });
                } else {
                    this.setState({ error: '' });
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.user.name);
                    this.props.authenticate();
                }
            });
    }

    render() {
        const validObj = validationFunc(
            this.state.email,
            this.state.password
        );

        return (
            <form onSubmit={this.submitLogin.bind(this)}>
                <fieldset className='App'>
                    <div style={{display: 'inline-grid'}}>
                        <h2>Login Form</h2>
                        {this.state.error.length !== 0 ? <p>{this.state.error}</p> : null}
                        <Input
                            type='text'
                            data='email'
                            name='Email'
                            func={e => {
                                this.setState({email: e.target.value})
                            }}
                            valid={validObj.validMail}
                        />
                        <Input
                            type='password'
                            data='password'
                            name='Password'
                            func={e => {
                                this.setState({password: e.target.value})
                            }}
                            valid={validObj.validPassword}
                        />

                        <input
                            type='submit'
                            value='Login'
                        />
                    </div>
                </fieldset>
            </form>
        )
    }
}