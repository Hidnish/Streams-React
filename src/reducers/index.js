import { combineReducers } from 'redux';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

// key 'form' --> mandatory for 'formReducer'
export default combineReducers({
    auth: authReducer,
    streams: streamReducer
});