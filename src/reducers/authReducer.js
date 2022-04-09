import { SIGN_IN, SIGN_OUT } from "../actions/types";

// default argument contained inside {} --> capitalized syntax indicated that the variable must not be changed
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

// state = {} to hold other peaces of data in the future 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null }
        default:
            return state;
    }
}