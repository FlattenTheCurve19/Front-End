import {
    FETCHING_MESSAGES_START,
    FETCHING_MESSAGES_SUCCESS,
    FETCHING_MESSAGES_ERROR,
    ADD_MESSAGE
} from '../Actions/messageActions';

const initalState = {
    messages: [
        {
            displayName: '',
            location: {
                lat: '',
                long: ''
            },
            message: '',
            timeStamp: 0
        }
    ],
    error: '',
    isFetching: ''
}

export default ( state = initalState, { type, payload }) => {
    switch(type){
        case FETCHING_MESSAGES_START :
        return{
            ...state, 
            isFetching: true
        }
        case FETCHING_MESSAGES_SUCCESS : 
        return {
            ...state, 
            messages: payload,
            isFetching: false
        }
        case FETCHING_MESSAGES_ERROR :
            return{ 
                ...state,
                isFetching: false,
                error: 'sorry there are no messages near your current location',
                messages: [] 
            }
        case ADD_MESSAGE: 
            return {
                ...state,
                messages: [
                    ...state.messages, payload
                ]
            }

        default:
            return state;
    }
}