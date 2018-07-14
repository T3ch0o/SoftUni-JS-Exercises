import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import querystring from 'query-string';

import MusicPlayer from './partials/MusicPlayer';
import { requestPlaylistAction, updatePlaylistAction, editPlaylistAction } from '../../../actions/playlistActions';
import { updateUserAction, userAction } from '../../../actions/authActions';
import SongsList from './partials/SongsList';
import formatData from "../../../utils/formatData";

class PlaylistComponent extends Component {
    constructor() {
        super();

        this.state = {
            song: 0,
            liked: false,
            favorite: false
        };

        this.like = this.like.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPlaylist(id);
    }

    componentWillReceiveProps(nextProp) {
        const query = querystring.parse(nextProp.location.search);
        this.setState({song: query.song - 1});
        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user');

            if (nextProp.playlist.likes.includes(user)) {
                this.setState({liked: true});
            }

            if (nextProp.playlist.favorites.includes(user)) {
                this.setState({favorite: true});
            }
        }
    }

    like() {
        this.type = 'likes';
        this.currentState = 'liked';
        const format = formatData.bind(this);
        format();
    }

    addToFavorites() {
        this.type = 'favorites';
        this.currentState = 'favorite';
        const format = formatData.bind(this);
        format();
    }

    deleteSong(songName) {
        const payload = this.props.playlist;
        const id = this.props.match.params.id;
        if (payload.creator === localStorage.getItem('user') || localStorage.getItem('role') === 'Admin') {
            const index = payload.songs.findIndex(song => song.songTitle === songName);
            payload.songs.splice(index, 1);
            this.props.editPlaylist(payload, payload._id)
                .then(() => this.props.getPlaylist(id));
        }
    }

    render() {
        const { _id ,songs, title, imageUrl, creator, likes, favorites } = this.props.playlist;
        return (
            <div className="playlist-playing">
                <section className="playlist-view">
                    <Fade big>
                        <div>
                            <img className="player-img" src={imageUrl} alt=""/>
                            <p className="playlist-title">{title}</p>
                            <p className="playlist-creator">{creator}</p>
                            <p className="playlist-information">{songs ? songs.length : 0} songs - {likes ? likes.length : 0} likes - {favorites ? favorites.length : 0} favorites</p>
                            <div className="playlist-buttons">
                                {localStorage.getItem('user') &&
                                <div>
                                    <i onClick={this.like} className={`fa fa-thumbs-up ${this.state.liked && 'liked'}`} aria-hidden="true"/>
                                    <i onClick={this.addToFavorites} className={`fa fa-heart ${this.state.favorite && 'favorite'}`} aria-hidden="true"/>
                                </div>
                                }
                            </div>
                        </div>
                    </Fade>
                    <SongsList songs={songs} id={_id} songId={this.state.song} creator={creator} deleteSong={this.deleteSong}/>
                </section>
                <MusicPlayer playlist={songs} currentSong={this.state.song} id={_id}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        playlist: state.playlist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlaylist: (id) => dispatch(requestPlaylistAction(id)),
        updatePlaylist: (payload, id) => dispatch(updatePlaylistAction(payload, id)),
        editPlaylist: (payload, id) => dispatch(editPlaylistAction(payload, id)),
        getUser: () => dispatch(userAction()),
        updateUser: (payload, id) => dispatch(updateUserAction(payload, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistComponent);