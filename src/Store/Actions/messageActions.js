import { fireDB } from "../../_utils/firebase";
import "firebase/firestore";
import { createPost } from '../../_utils/firedbHelper'

//getting messages for to display
export const FETCHING_MESSAGES_START = 'FETCHING_MESSAGES_START';
export const FETCHING_MESSAGES_SUCCESS = 'FETCHING_MESSAGES_SUCCESS';
export const FETCHING_MESSAGES_ERROR = 'FETCHING_MESSAGES_ERROR';

//the action creator for geeting the messages of the message board
export const messageGetter = () => dispatch => {
    dispatch({type: FETCHING_MESSAGES_START});
    const posts = fireDB.collection("post").get().then(res => {
        const array = []
        res.forEach(item => array.push(item.data()))
        dispatch({type: FETCHING_MESSAGES_SUCCESS, payload: array})
      }).catch(err => dispatch({type: FETCHING_MESSAGES_ERROR, payload:err }))
}

export const idGetter = () => dispatch => {
  //action creator for the getting the id
}

export const messageSetter = message => dispatch => {
  //action creator so a auth user can post a message
  createPost('user.username', message, 'longitude', 'latitude')
}

