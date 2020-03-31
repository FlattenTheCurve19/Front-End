import { SET_CENTER_LOCATION } from '../Actions/locationActions';

export const locationReducer = (state = {}, action) => {
    switch(action.type){
        case SET_CENTER_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state;
    }
}