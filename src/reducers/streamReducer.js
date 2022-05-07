import _ from 'lodash';
import { 
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

// actions provides responses following REST conventions
export default (state={}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id')} // 3
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload} // 1
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload}
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload}
        case DELETE_STREAM:
            return _.omit(state, action.payload) //2
        default: 
            return state
    }
}

// 1 Alternative code for:
// const newState = {... state};
// newState[action.payload.id] = payload.id;
// return newState;

// 2 only requires action.payload because the DELETE_STREAM only returns the 'id' 

// 3 _.mapKeys(action.payload, 'id') -> take the state array and convert it into an object --> 
// --> each array object will be assigned as value to a key ('id') -> { id : { object }, id2: { object2 } }
// '...' -> take all the value/key objects created by mapKeys() and add them to the new object that gets created