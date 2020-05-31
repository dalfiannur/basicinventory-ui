import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthRoute} from "./Components/AuthRoute";
import {DashboardPage} from "./Pages/Dashboard";
import {LoginPage} from "./Pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <AuthRoute path={'/'} component={DashboardPage}/>
                <Route path={'/login'} component={LoginPage} exact/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
