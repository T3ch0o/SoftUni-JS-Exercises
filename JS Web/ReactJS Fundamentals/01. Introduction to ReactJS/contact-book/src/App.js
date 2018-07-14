import React, {Component} from 'react';
import './App.css';
import Contact from "./Components/Contact";
import ContactDetails from "./Components/Details";

class App extends Component {
    constructor() {
        super();

        this.state = {
            contactId: 0
        };
    }

    changeContact(id) {
        this.setState({contactId: id});
        console.log(this.state.contactId);
    }

    render() {
        return (
            <div className='App'>
                <header>&#9993; Contact Book</header>
                <div id="book">
                    <div id="list">
                        <h1>Contacts</h1>
                        <Contact changeContact={this.changeContact.bind(this)}/>
                    </div>
                    <div id="details">
                        <h1>Details</h1>
                        <ContactDetails contactId={this.state.contactId}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
