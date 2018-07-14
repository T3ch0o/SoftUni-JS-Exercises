import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import dateConverter from '../../utils/dateConverter';
import requestHandler from '../../utils/requestHandler';
import dataCollector from '../../utils/dataCollector';
import Comment from "./partials/Comment";

export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPost: {},
            comments: []
        }
    }

    createComment() {
        const payload = {
            content: this.state.content,
            postId: this.props.match.params.id,
            author: localStorage.getItem('username')
        };

        requestHandler.createComment(payload)
            .then(comments => this.setState({comments}));
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        requestHandler.getDetails(id)
            .then(post => {
                requestHandler.getComments(id)
                    .then(comments => this.setState({currentPost: post, comments}));
            });
    }

    render() {
        return (
            <section id="viewComments">
                <div className="post">
                    <div className="col thumbnail">
                        <a href="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                            <img src="src/RuditoFreshStep.jpg"/>
                        </a>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <a href="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                                {this.state.currentPost.title}
                            </a>
                        </div>
                        <div className="details">
                            <p>{this.state.currentPost.description}</p>
                            <div className="info">
                                submitted  ago by {this.state.currentPost.author}
                            </div>
                            <div className="controls">
                                <ul>
                                    <li className="action"><Link className="editLink" to={`/edit/${this.state.currentPost._id}`}>edit</Link></li>
                                    <li className="action"><Link className="deleteLink" to={`/delete/${this.state.currentPost._id}`}>delete</Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="post post-content">
                    <form id="commentForm" onSubmit={this.createComment.bind(this)}>
                        <label>Comment</label>
                        <textarea name="content" type="text" onChange={dataCollector.bind(this)}></textarea>
                        <input type="submit" value="Add Comment" id="btnPostComment"/>
                    </form>
                </div>
                {this.state.comments.map((comment) => {
                    return <Comment key={comment._id} comment={comment} date={dateConverter(comment._kmd.lmt)}/>
                })}
            </section>
        );
    }
}