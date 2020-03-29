import React, { useEffect } from "react";
import { Route } from "react-router";
import NaviBar from "./Components/NavigationBar/NaviBar";
import { StylesProvider } from "@material-ui/styles";
import "./Styles/index.scss";
import Registration from "./Components/Users/Registration";
import Login from "./Components/Users/Login";

import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

function App() {


  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       // User is signed in.
  //       var displayName = user.displayName;
  //       var email = user.email;
  //       var emailVerified = user.emailVerified;
  //       var photoURL = user.photoURL;
  //       var isAnonymous = user.isAnonymous;
  //       var uid = user.uid;
  //       var providerData = user.providerData;
  //       // ...
  //     } else {
  //       // User is signed out.
  //       // ...
  //     }
  //   });
  // }, [])

  return (
    <StylesProvider injectFirst>
      <div className="App">
          <Route path ='/'>
            <NaviBar />
          </Route>
          <Route path ='/login'>
            <Login />
          </Route>
          <Route path ='/register'>
            <Registration />
          </Route>
        
      </div>
    </StylesProvider>
  );
}

export default App;
