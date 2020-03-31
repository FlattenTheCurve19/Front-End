import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { setInitialData } from "./Store/Actions/covid19Actions";
import "./Styles/index.scss";

// Component Imports
import NaviBar from "./Components/NavigationBar/NaviBar";
import Registration from "./Components/Users/Registration";
import Login from "./Components/Users/Login";
import Home from "./Pages/Home";
import MessageBoard from "./Components/MessageBoard";
// Add the Firebase services that you want to use
import * as firebase from "firebase/app";
import "firebase/auth";
<<<<<<< HEAD
import Proximity from "./Components/ProximityMap/Proximity";
import TestFeed from "./TestFeed";
=======
import TestFeed, { postFunc } from "./TestFeed";
import Proximity from "./Components/ProximityMap/Proximity";
>>>>>>> 85abe3018e70a9376355a93e51b53c1f240d8c4d

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(setInitialData());
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        /* User constants per example //
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData; */
        setUser({ user });
      } else {
        setUser({ user: null });
      }
    });
  }, []);

  return (
    <StylesProvider injectFirst>
      {console.log(user)}
      <div className="App">
        <NaviBar user={user} />
        <Route exact path="/">
<<<<<<< HEAD
          <Home />
        </Route>
=======
            <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/message-board">
          <MessageBoard />
        </Route>
        <TestFeed />
>>>>>>> 85abe3018e70a9376355a93e51b53c1f240d8c4d
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/message-board">
          <MessageBoard />
        </Route>
        <Route path="/proximity-map">
          <Proximity />
        </Route>
      </div>
    </StylesProvider>
  );
}

export default App;
