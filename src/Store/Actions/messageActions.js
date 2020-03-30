// Declare and define actions for message board here
import { fireDB } from "./_utils/firebase";
import "firebase/firestore";

//getting messages for to display
export const FETCHING_MESSAGES_START = 'FETCHING_MESSAGES_START';
export const FETCHING_MESSAGES_SUCCESS = 'FETCHING_MESSAGES_SUCCESS';
export const FETCHING_MESSAGES_ERROR = 'FETCHING_MESSAGES_ERROR';

export const FETCHING_USERAVIATOR_START = 'FETCHING_USERAVIATOR_START';
export const FETCHING_USERAVIATOR_SUCCESS = 'FETCHING_USERAVIATOR_SUCCESS';
export const FETCHING_USERAVIATOR_ERROR = 'FETCHING_USERAVIATOR_ERROR';

//adding messages to message board
export const ADD_MESSSAGE = 'ADD_MESSAGE';

export const messageGetter = () => dispatch => {
    dispatch({type: FETCHING_MESSAGES_START});
    const posts = fireDB.collection("post").doc("ALzygydxSdxSp4EvxDU4");
    posts
    .get(res => console.log(res.data()))
    .catch(err => console.log(err))
}
