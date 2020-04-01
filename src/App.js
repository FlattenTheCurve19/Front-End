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
import MessageBoard from "./Components/MessageBoard";

// Page Imports 
import Home from "./Pages/Home";
import MessageMapPage from './Pages/MessageMapPage'

// Add the Firebase services that you want to use
import * as firebase from "firebase/app";
import "firebase/auth";
import Proximity from "./Components/ProximityMap/Proximity";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(setInitialData());
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser({ user });
      } else {
        setUser({ user: null });
      }
    });
  }, [dispatch]);

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <NaviBar user={user} />
        <Route exact path="/">
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
        {/* <TestFeed /> */}
        <Route path="/proximity-map">
          <Proximity />
        </Route>
        <Route path='/message-map-page'>
          <MessageMapPage/>
        </Route>
      </div>
    </StylesProvider>
  );
}

export default App;
