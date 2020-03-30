import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import {setInitialData} from './Store/Actions/covid19Actions';
import "./Styles/index.scss";

// Component Imports
import NaviBar from "./Components/NavigationBar/NaviBar";
import Registration from "./Components/Users/Registration";
import Login from "./Components/Users/Login";
import Home from './Pages/Home';
import MessageBoard from './Components/MessageBoard';

// Add the Firebase services that you want to use
import * as firebase from "firebase/app";
import "firebase/auth";
import TestFeed from './TestFeed'

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(setInitialData());
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
          <Route exact path ='/'>
            <NaviBar />
            <Route>
              <Home />
            </Route>
          </Route>
          <Route path ='/login'>
            <Login />
          </Route>
          <Route path ='/register'>
            <Registration />
          </Route>
          <Route path='/message-board'>
            <MessageBoard/>
          </Route>
      </div>
    </StylesProvider>

  );
}

export default App;
