import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import NaviBar from "./Components/NavigationBar/NaviBar";
import { StylesProvider } from "@material-ui/styles";
import "./Styles/index.scss";
import Registration from "./Components/Users/Registration";
import Login from "./Components/Users/Login";


// Add the Firebase services that you want to use
import * as firebase from "firebase/app";
import "firebase/auth";
import TestFeed, {postFunc} from './TestFeed'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        /* User constants per example //
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData; */
        setUser({ user })
      } else {
        setUser({ user: null })
      }
    });
  }, [])

  return (
    <StylesProvider injectFirst>
      <div className="App">
          <Route path ='/'>
            <NaviBar />
          </Route>
        <TestFeed /> 
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
