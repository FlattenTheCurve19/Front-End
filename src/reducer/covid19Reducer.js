import { SET_INITIAL_DATA } from '../actions/covid19Actions';

export const covid19Reducer = (state = {
    countries: null,
    confirmedFinished: false,
    deathsFinished: false,
    recoveredFinished: false,
}, action) => {
    switch(action.type){
        case SET_INITIAL_DATA:
            return {
                ...state,
                countries: action.payload
            }
        default:
            return state;
    }
}