import firebase from "firebase";
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
  avatar
) => {
  // fireDB
  //   .collection("post")
  //   .doc()
  //   .set({
  //     ...post,
  //     displayName: user,
  //     userUUID: uuid,
  //     postField: postfield,
  //     geoLock: new firebase.firestore.GeoPoint(lat, long)
  //   })
  //   .then(() => {
  //     console.log("Document successfully written!");
  //   })
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
    avatar: avatar
  });
};

export const deletePost = postID => {
  fireDB
    .collection("post")
    .doc(`${postID}`)
    .delete();
};
