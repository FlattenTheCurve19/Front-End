import firebase from "firebase/app";
import { fireDB } from "./firebase";
import "firebase/firestore";
import { GeoFirestore } from "geofirestore";
const geofirestore = new GeoFirestore(fireDB);
const geocollection = geofirestore.collection("post");

const post = {
  displayName: "",
  userUUID: "",
  postField: "",
  timeOfPost: firebase.firestore.Timestamp.fromDate(new Date()),
  geoLock: {
    longitude: Number,
    latitude: Number
  },
  avatar: ""
};

export const createPost = (
  user,
  uuid = "1354",
  postfield,
  long,
  lat,
  avatar,
  img
) => {
  geocollection.add({
    ...post,
    displayName: user,
    userUUID: uuid,
    postField: postfield,
    geoLock: {
      latitude: lat,
      longitude: long
    },
    coordinates: new firebase.firestore.GeoPoint(lat, long),
    avatar: avatar,
    image: img
  })
  .then(res => {
    console.log("Success");
  })
  .catch(err => console.error('Error', err.message));
};

export const deletePost = postID => {
  fireDB
    .collection("post")
    .doc(`${postID}`)
    .delete();
};
