import * as StreamActions from '../actions/streams.action'

const initialState : Object[] = [];

export function streamsReducer(state : Object[] = initialState, action : StreamActions.Actions) {
  switch (action.type) {
    case StreamActions.GET_ALL_STREAMS:
      state = [...action.payload];
      return state;
    case StreamActions.REMOVE_STREAM:
      return state;
    default:
      return state;
  }
}
