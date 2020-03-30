import {
    FETCHING_MESSAGES_START,
    FETCHING_MESSAGES_SUCCESS,
    FETCHING_MESSAGES_ERROR
} from '../Actions/messageActions';

const initalState = {
    messagesBoard: [],
    error: '',
    isFetching: ''
}

export const messageBoard = ( state = initalState, { type, payload }) => {
    switch(type){
        case FETCHING_MESSAGES_START :
        return{
            ...state, 
            isFetching: true
        }
        case FETCHING_MESSAGES_SUCCESS : 
        return {
            ...state, 
            messagesBoard: payload,
            isFetching: false
        }
        case FETCHING_MESSAGES_ERROR :
            return{ 
            ...state,
            isFetching: false,
            error: 'sorry there are no messages near your current location',
            messagesBoard: [] 
            }
        default:
            return state;
    }
}


 // case ADD_MESSAGE: 
        //     return {
        //         ...state,
        //         messages: [
        //             ...state.messages, payload
        //         ]
        //     }


        // {
        //     displayName: '',
        //     geoLock: {
        //         lat: '',
        //         long: ''
        //         },
        //     postField: '',
        //     timeOfPost: 0
        //        }

