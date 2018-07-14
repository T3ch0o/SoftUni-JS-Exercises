import React from 'react';
import { Link } from 'react-router-dom';

const SongsList = function(props) {
    const { songName, creator ,id, index, songId, deleteSong } = props;
    const isTrue = index === songId;
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    return (
        <li>
            <Link to={`/web-player/playlist/${id}?song=${index + 1}`} className={isTrue ? 'active' : ''}><i className={isTrue ? `fa fa-play` : `fa fa-music`} aria-hidden="true"/> {songName}</Link>
            {creator === user || role === 'Admin' ? <a className="song-delete" href="javascript:void(0)" onClick={() => deleteSong(songName)}><i className="fa fa-minus" aria-hidden="true"/> </a> : null}
        </li>
    );
};

export default SongsList;