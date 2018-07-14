import React, {Component} from 'react';
import database from '../db/contacts';

class Contacts extends Component {
    constructor(props) {
        super(props);

        this.contacts = database;
    }

    render() {
        const contacts = this.contacts.map((contact, index) =>
            <div key={index} className="contact" onClick={() => this.props.changeContact(index)}>
                <span className="avatar small">&#9787;</span>
                <span className="title">{contact.firstName} {contact.lastName}</span>
            </div>
        );

        return (
            <div className="content">
                {contacts}
            </div>
        );
    }
}

export default Contacts;