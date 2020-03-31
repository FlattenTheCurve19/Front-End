import firebase from 'firebase'
import { fireDB } from './firebase'
import 'firebase/firestore'

const post = {
  displayName: "",
  postField: "",
  timeOfPost: firebase.firestore.Timestamp.fromDate(
    new Date()
  ),
  geoLock: {
    longitude: Number,
    latitude: Number
  },
};

export const createPost = (user, postfield, long, lat) => {
  fireDB.collection("post").doc().set({
    ...post,
    displayName: user,
    postField: postfield,
    geoLock: {
      longitude: long,
      latitude: lat
    }
  }).then(() => {
    console.log("Document successfully written!");
});
};
