import React from 'react';

import Playlist from './Playlist';

const LatestPlaylist = function(props) {
    const { playlists } = props;

    const mostRecent = playlists.slice(0, 6);

    return (
        <ul>
            {mostRecent.map(p =>
                <Playlist
                    key={p._id}
                    id={p._id}
                    image={p.imageUrl}
                    title={p.title}
                    creator={p.creator}
                />
            )}
        </ul>
    );
};

export default LatestPlaylist;