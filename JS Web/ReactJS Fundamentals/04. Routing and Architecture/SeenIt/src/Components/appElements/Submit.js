import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import dataCollector from '../../utils/dataCollector';
import requestHandler from '../../utils/requestHandler';

export default class Submit extends Component {
    constructor() {
        super();

        this.state = {
            redirectToReferrer: false
        };

        this.createPost = this.createPost.bind(this);
    }

    createPost(event) {
        event.preventDefault();
        const payload = this.state;
        payload.author = localStorage.getItem('username');
        delete payload.redirectToReferrer;
        requestHandler.createPost(payload)
            .then(data => this.setState({redirectToReferrer: true}));
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <section id="viewSubmit" onSubmit={this.createPost}>
                <div className="submitArea">
                    <h1>Submit Link</h1>
                    <p>Please, fill out the form. A thumbnail image is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form id="submitForm" className="submitForm">
                        <label>Link URL:</label>
                        <input name="url" type="text" onChange={dataCollector.bind(this)}/>
                        <label>Link Title:</label>
                        <input name="title" type="text" onChange={dataCollector.bind(this)}/>
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="imageUrl" type="text" onChange={dataCollector.bind(this)}/>
                        <label>Comment (optional):</label>
                        <textarea name="description" onChange={dataCollector.bind(this)}/>
                        <input id="btnSubmitPost" value="Submit" type="submit"/>
                    </form>
                </div>
            </section>
        );
    }
};