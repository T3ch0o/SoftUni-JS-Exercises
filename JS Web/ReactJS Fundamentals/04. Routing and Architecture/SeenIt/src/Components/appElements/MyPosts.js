import React from 'react';

const MyPosts = function() {
    return (
        <section id="viewMyPosts">
            <div className="post post-content">
                <h1>Your Posts</h1>
            </div>
            <div className="posts">
                <article className="post">
                    <div className="col rank">
                        <span>1</span>
                    </div>
                    <div className="col thumbnail">
                        <a href="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                            <img src="src/RuditoFreshStep.jpg"/>
                        </a>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <a href="http://sammyjs.org/docs/api/0.7.4/all#Sammy.RenderContext-load">
                                Sammy Docs
                            </a>
                        </div>
                        <div className="details">
                            <div className="info">
                                submitted 5 days ago by pesho
                            </div>
                            <div className="controls">
                                <ul>
                                    <li className="action"><a className="commentsLink" href="#">comments</a></li>
                                    <li className="action"><a className="editLink" href="#">edit</a></li>
                                    <li className="action"><a className="deleteLink" href="#">delete</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="clear"></div>
                </article>
            </div>
        </section>
    );
};

export default MyPosts;