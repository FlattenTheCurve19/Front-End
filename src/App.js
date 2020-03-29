import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Route } from "react-router";
import NaviBar from "./Components/NavigationBar/NaviBar";
import { StylesProvider } from "@material-ui/styles";
import MapChart from './Components/MapChart';
import {setInitialData} from './actions/covid19Actions';
import "./Styles/index.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialData());
  }, [])

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <Route>
          <NaviBar />
          <Route>
            <MapChart />
          </Route>
        </Route>
      </div>
    </StylesProvider>
  );
}

export default App;
