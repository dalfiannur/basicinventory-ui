import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthRoute} from "./Components/AuthRoute";
import {DashboardPage} from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path={'/'} component={DashboardPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
