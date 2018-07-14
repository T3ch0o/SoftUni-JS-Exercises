import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import validator from 'validator';
import toastr from 'toastr';
import './App.css';

import Home from './Home';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

toastr.options.newestOnTop = false;
toastr.options.closeButton = true;

function validateRegisterForm(payload) {
  let errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
    isFormValid = false;
    errors.password = 'Password must have at least 3 characters.';
  }

  if (!payload || payload.password !== payload.confirmedPassword) {
    isFormValid = false;
    errors.passwordsDontMatch = 'Passwords do not match!';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Form Validation Failed!';
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}

function validateLoginForm(payload) {
  let errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Form Validation Failed!';
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <header>
            <span className="title">Navigation</span>
          </header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" render={(props) =>
              <RegisterForm
                validateFunc={validateRegisterForm}
                {...props}
              />}
            />
            
            <Route exact path="/login" render={(props) =>
              <LoginForm
                validateFunc={validateLoginForm}
                {...props}
              />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;