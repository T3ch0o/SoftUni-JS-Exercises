import React from 'react';

const Header = function(props) {
    return (
        <header>
            <span className="logo">☃</span><span className="header">SeenIt</span>
            {props.username ?
                <div id="profile"><span>{props.username}</span>|<a href="#" onClick={props.logout}>logout</a></div> : null}
        </header>
    );
};

export default Header;