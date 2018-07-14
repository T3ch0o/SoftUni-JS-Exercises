import * as actionTypes from './actionTypes';

function calculator(state = 0, action) {
    switch (action.type) {
        case actionTypes.ADD:
            return state + 1;
        case actionTypes.SUBTRACT:
            return state - 1;
        case actionTypes.CLEAR:
            return state = 0;
        default:
            return state;
    }
}

export default calculator;