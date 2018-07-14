import { REQUEST_PLAYLIST } from '../actions/actionTypes';

export default function playlistReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_PLAYLIST:
            return Object.assign({}, action.data);
        default:
            return state;
    }
};
