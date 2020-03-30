import {
    // Import Actions Here
} from '../Actions/messageActions';

const initalState = {
    messages: [
        {
            name: '',
            email: '',
            location: '',
            message: '',
            timeStamp: 0
        }
    ],
    error: '',
    isFetching: ''
}

export default ( state = initalState, { type, payload }) => {
    switch(type){

        default:
            return state;
    }
}