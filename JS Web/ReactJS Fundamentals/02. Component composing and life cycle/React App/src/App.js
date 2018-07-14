import React, { Component } from 'react'
import './App.css'
import Slider from './Components/Slider'
import observerMenu from './utils/Observer';
import CharactersList from "./Components/Character";
import Details from "./Components/Details";

class App extends Component {
    constructor() {
        super();

        this.state = {
            focusImageId: 0,
            rosterImageId: 0
        };

        this.changeFocusImageId = (id) => {
            this.setState({ focusImageId: id });
        };

        this.eventHandler = (newState) => {
            this.setState({rosterImageId: newState});
        };
    }

    componentDidMount() {
        observerMenu.addObserver('changeImage', this.eventHandler);
    }

    render () {
        return (
            <div className='App'>
                <Slider updateFunc={this.changeFocusImageId} focusImageId={this.state.focusImageId} />
                <CharactersList />
                <Details characterId={this.state.rosterImageId}/>
            </div>
        );
    }
}

export default App
