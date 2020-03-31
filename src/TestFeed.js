import React, { useState, useEffect } from "react";
// Add the Firebase services that you want to use
import { fireDB } from "./_utils/firebase";
import "firebase/firestore";
import axios from "axios";
import { createPost } from "./_utils/firedbHelper";

const TestFeed = () => {
  const [post, setPost] = useState({});

  // const posts = fireDB
  //   .collection("post")
  //   .get()
  //   .then(res => {
  //     res.forEach(item => console.log("*&*&*", item.data()));
  //   });

  // How to read data in Realtime. Doesnt contain a timeout, use with cation
  // const getDoc = posts.onSnapshot(item => {
  //   console.log('*ITEM*',item)
  //   // setPost(item)
  // })

  useEffect(() => {
    // console.log('&&&&&',posts)
    // const getDoc = posts
    //   .get()
    //   .then(doc => {
    //     if (!doc.exists) {
    //       console.log("No such document!");
    //     } else {
    //       console.log("Document data:", doc.data());
    //       return setPost(doc.data())
    //     }
    //   })
    //   .catch(err => {
    //     console.log("Error getting document", err);
    //   });
  }, []);
  return (
    <>
      <button onClick={() => createPost("Timmy", "I made a post LOL", 20, 20)}>
        makepost
      </button>
      {post ? (
        <div>
          <p>{post.displayName}</p>
          <p>{post.postField}</p>
          {/* <p>{post.geoLock.latitude}, {post.geoLock.longitude}</p> */}
          <p>{post.timeOfPost}</p>
        </div>
      ) : null}
    </>
  );
};

export default TestFeed;
