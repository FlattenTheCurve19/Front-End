import { fireDB } from "../../_utils/firebase";
import "firebase/firestore";
import { createPost } from '../../_utils/firedbHelper'

export const FETCHING_MESSAGES_START = 'FETCHING_MESSAGES_START';
export const FETCHING_MESSAGES_SUCCESS = 'FETCHING_MESSAGES_SUCCESS';
export const FETCHING_MESSAGES_ERROR = 'FETCHING_MESSAGES_ERROR';


export const messageGetter = () => dispatch => {
    dispatch({type: FETCHING_MESSAGES_START});
    fireDB.collection("post").get()
        .then(res => {
            const array = []
            res.forEach(item => {
                array.push({
                    postId: item.id,
                    ...item.data()
                })
            })
            dispatch({ type: FETCHING_MESSAGES_SUCCESS, payload: array })
        })
        .catch(err => dispatch({ type: FETCHING_MESSAGES_ERROR, payload:err }))
}

///need another get request for the id aviator 

export const messageSetter = message => dispatch => {
  createPost('user.username', message, 'longitude', 'latitude')
}

