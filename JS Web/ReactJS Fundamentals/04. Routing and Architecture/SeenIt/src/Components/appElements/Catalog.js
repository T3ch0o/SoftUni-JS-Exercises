import React, { Component } from 'react';

import requestHandler from '../../utils/requestHandler';
import Post from './partials/Post';

export default class Catalog extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        requestHandler.getPosts()
            .then(data => this.setState({posts: data}));
    }

    render() {
        return (
            <section id="viewCatalog">
                <div className="posts">
                    {this.state.posts.map((post, index ) => {
                        return <Post key={post._id} post={post} index={index}/>
                    })}
                </div>
            </section>
        );
    }
};