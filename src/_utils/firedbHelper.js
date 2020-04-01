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
  }
};

export const createPost = (user, uuid = "1354", postfield, long, lat) => {
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
    coordinates: new firebase.firestore.GeoPoint(lat, long)
  });
};

export const deletePost = async (postID) => {
  //https://firebase.google.com/docs/firestore/manage-data/delete-data

  try {
    await fireDB.collection("post").doc(postID).delete();
    return console.log('Delete was successful');
  }
  catch (err) {
    return console.log('Delete failed', err);
  }
};
