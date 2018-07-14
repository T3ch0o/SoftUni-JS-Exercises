import React from 'react';
import { Link } from 'react-router-dom';

import dateConverter from '../../../utils/dateConverter';

const Post = function(props) {
    return (
        <div className="posts" key={props.post._id}>
            <article className="post">
                <div className="col rank">
                    <span>{props.index + 1}</span>
                </div>
                <div className="col thumbnail">
                    <a href={props.post.url}>
                        <img
                            src={props.post.imageUrl}/>
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={props.post.url}>
                            {props.post.title}
                        </a>
                    </div>
                    <div className="details">
                        <div className="info">
                            submitted {dateConverter(props.post._kmd.lmt)} ago by {props.post.author}
                        </div>
                        <div className="controls">
                            <ul>
                                <li className="action"><Link className="commentsLink" to={`/details/${props.post._id}`}>comments</Link></li>
                                <li className="action"><Link className="editLink" to={`/edit/${props.post._id}`}>edit</Link></li>
                                <li className="action"><Link className="deleteLink" to={`/delete/${props.post._id}`}>delete</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Post;