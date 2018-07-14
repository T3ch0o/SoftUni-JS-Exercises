import React, { Component } from 'react';
import database from '../db/contacts';

class ContactDetails extends Component{
    constructor(props) {
        super(props);

        this.state = {
            contact: database[0]
        };
    }

    componentWillReceiveProps(nextProp) {
        this.setState({contact: database[nextProp.contactId]});
    }

    render() {
        return (
            <div className="content">
                <div className="info">
                    <div className="col">
                        <span className="avatar">&#9787;</span>
                    </div>
                    <div className="col">
                        <span className="name">{this.state.contact.firstName}</span>
                        <span className="name">{this.state.contact.lastName}</span>
                    </div>
                </div>
                <div className="info">
                    <span className="info-line">&phone; {this.state.contact.phone}</span>
                    <span className="info-line">&#9993; {this.state.contact.email}</span>
                </div>
            </div>
        );
    }
}

export default ContactDetails;