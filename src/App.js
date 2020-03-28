import React from "react";
import { Route } from "react-router";
import NaviBar from "./Components/NavigationBar/NaviBar";
import { StylesProvider } from "@material-ui/styles";
import "./Styles/index.scss";

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <Route>
          <NaviBar />
        </Route>
      </div>
    </StylesProvider>
  );
}

export default App;
