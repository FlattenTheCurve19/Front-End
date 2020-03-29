import React from "react";
import { Route } from "react-router";
import NaviBar from "./Components/NavigationBar/NaviBar";
import { StylesProvider } from "@material-ui/styles";
import "./Styles/index.scss";
import Registration from "./Components/Users/Registration";
import Login from "./Components/Users/Login";

function App() {
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
