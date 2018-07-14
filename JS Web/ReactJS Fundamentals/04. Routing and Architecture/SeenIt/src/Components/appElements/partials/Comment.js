import React from 'react';
import { Link } from 'react-router-dom';

const Comment = function(props) {
    return (
        <article className="post post-content">
            <p>{props.comment.content}</p>
            <div className="info">
                submitted {props.date} days ago by {props.comment.author} | <Link to={`/delete/${props.comment._id}`} className="deleteLink">delete</Link>
            </div>
        </article>
    );
};

export default Comment;