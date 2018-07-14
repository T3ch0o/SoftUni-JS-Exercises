import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ViewComponent from "./ViewComponent";

class WebPlayerPage extends Component {
    render() {
        return (
            <div className="web-player">
                <section className="side-nav">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/web-player/search"><i className="fa fa-search" aria-hidden="true"/> search</NavLink>
                            </li>
                            <li>
                                <NavLink to="/web-player/playlists"><i className="fa fa-play" aria-hidden="true"/> all playlists</NavLink>
                            </li>
                            <li>
                                {localStorage.getItem('user') && <NavLink to="/web-player/your-library"><i className="fa fa-book" aria-hidden="true"/> your library</NavLink>}
                            </li>
                        </ul>
                    </nav>
                </section>
                <section className="content-container">
                    <ViewComponent/>
                </section>
            </div>
        );
    }
}

export default WebPlayerPage;