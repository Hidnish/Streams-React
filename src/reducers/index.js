import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

// key 'form' --> mandatory for 'formReducer'
export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});