import { combineReducers } from 'redux';
import { covid19Reducer } from './covid19Reducer';
import userAuthReducer from './userAuthReducer';

export default combineReducers({
    auth: userAuthReducer,
    covid19Reducer,
})