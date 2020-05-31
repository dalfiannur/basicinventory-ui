import React, {ComponentClass, FunctionComponent} from 'react';
import {LoginPage} from "../Pages/Login";
import {Route, RouteComponentProps} from 'react-router-dom';

interface IAuth {
    path: string,
    component: any
}

export const AuthRoute = (props: IAuth) => {
    const token = localStorage.getItem('userAuthToken');

    if (token) {
        return (<Route path={props.path} component={props.component} exact/>)
    }

    return (<LoginPage/>)
}