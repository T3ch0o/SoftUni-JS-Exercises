import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import GuestHome from './Components/auth/GuestHome';
import Wrapper from './Components/common/LogedWraper';

import './App.css';
import './utils/requestHandler';
import requestHandler from "./utils/requestHandler";

class App extends Component {
    constructor() {
        super();

        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('username')) {
            this.setState({username: localStorage.getItem('username')});
        }
    }

    logout() {
        requestHandler.logout()
            .then(data => {
                localStorage.clear();
                this.setState({username: ''});
            });
    }

    saveUser(username) {
        this.setState({username});
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header username={this.state.username} logout={this.logout.bind(this)}/>
                    {this.state.username ? <Wrapper /> : <GuestHome saveUser={this.saveUser.bind(this)}/> }
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
