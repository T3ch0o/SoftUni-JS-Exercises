import React, {Component} from 'react';
import './App.css';

import SingUpForm from './components/form/SingUpForm';
import LoginForm from "./components/form/LoginForm";
import CreateForm from "./components/form/CreateForm";
import Pokemons from "./components/Pokemons";

class App extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            token: '',
            pokemons: []
        };

        this.promisifyState = obj => {
            return new Promise(res => {
                this.setState(obj, res)
            }).catch(e => {
                console.log(e);
            });
        };
    }

    authenticate() {
        this.setState({
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token')
        });
    }

    updateList() {
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(res => res.json())
            .then(data => {
                this.promisifyState(this.setState({pokemons: data.pokemonColection}))
                    .then(() => {
                        console.log('images loaded');
                    });
            });
    }

    componentDidMount() {
        if (localStorage.getItem('username')) {
            this.setState({
                username: localStorage.getItem('username'),
                token: localStorage.getItem('token')
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.username.length === 0 ?
                    <div>
                        <SingUpForm />
                        <LoginForm authenticate={this.authenticate.bind(this)}/>
                    </div> :
                    <div>
                        <h1>Logged</h1>
                        <CreateForm updateList={this.updateList.bind(this)}/>
                        <Pokemons pokemons={this.state.pokemons} updateList={this.updateList.bind(this)}/>
                    </div>}
            </div>

        )
    }
}

export default App;
