import { fireDB } from "../../_utils/firebase";
import "firebase/firestore";

//getting messages for to display
export const FETCHING_MESSAGES_START = 'FETCHING_MESSAGES_START';
export const FETCHING_MESSAGES_SUCCESS = 'FETCHING_MESSAGES_SUCCESS';
export const FETCHING_MESSAGES_ERROR = 'FETCHING_MESSAGES_ERROR';


export const messageGetter = () => dispatch => {
    dispatch({type: FETCHING_MESSAGES_START});
    const posts = fireDB.collection("post").get().then(res => {
        const array = []
        res.forEach(item => array.push(item.data()))
        dispatch({type: FETCHING_MESSAGES_SUCCESS, payload: array})
      }).catch(err => dispatch({type: FETCHING_MESSAGES_ERROR, payload:err }))
}

///need another get request for the id aviator 

//need to make a post request for adding comments 

