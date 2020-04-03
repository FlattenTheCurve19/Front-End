import { fireDB } from "../../_utils/firebase";
import { GeoFirestore } from "geofirestore";
import "firebase/firestore";
import { createPost } from "../../_utils/firedbHelper";
import { getDistance } from "geolib";

export const FETCHING_MESSAGES_START = "FETCHING_MESSAGES_START";
export const FETCHING_MESSAGES_SUCCESS = "FETCHING_MESSAGES_SUCCESS";
export const FETCHING_MESSAGES_ERROR = "FETCHING_MESSAGES_ERROR";
export const FETCHING_USER_COORDS = "FETCHING_USER_COORDS";
export const FETCHING_USER_BOUNDS = "FETCHING_USER_BOUNDS";
export const FETCH_CENTER = "FETCH_CENTER";
export const FETCH_ZOOM = "FETCH_ZOOM";
export const FETCH_MSG_ID = "FETCH_MSG_ID";

const geofirestore = new GeoFirestore(fireDB);
const geocollection = geofirestore.collection("post");

export const messageGetter = (geoPoint, userInfo) => dispatch => {
  dispatch({ type: FETCHING_MESSAGES_START });
  geocollection
    .near({
      center: geoPoint,
      radius:
        getDistance(
          {
            latitude: userInfo.center.lat,
            longitude: userInfo.center.lng
          },
          {
            latitude: userInfo.bounds.nw.lat,
            longitude: userInfo.bounds.nw.lng
          }
        ) / 1000
    })
    .get()
    .then(res => {
      const array = [];
      res.forEach(item => {
        array.push({
          postId: item.id,
          ...item.data()
        });
      });
      dispatch({ type: FETCHING_MESSAGES_SUCCESS, payload: array });
    })
    .catch(err => dispatch({ type: FETCHING_MESSAGES_ERROR, payload: err }));
};

///need another get request for the id aviator
export const messageSetter = object => {
  //action creator so a auth user can post a message
    createPost(
      object.displayName,
      object.UUID,
      object.postField,
      object.geoLock.longitude,
      object.geoLock.latitude,
      object.avatar
    )
};
export const fetchCoords = coords => {
  return {
    type: FETCHING_USER_COORDS,
    payload: coords
  };
};

export const fetchBounds = bounds => {
  return {
    type: FETCHING_USER_BOUNDS,
    payload: bounds
  };
};

export const fetchCenter = center => {
  return {
    type: FETCH_CENTER,
    payload: center
  };
};

export const fetchZoom = zoom => {
  return {
    type: FETCH_ZOOM,
    payload: zoom
  };
};

export const setMsgId = id => {
  return {
    type: FETCH_MSG_ID,
    payload: id
  };
};
