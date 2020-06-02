import {RouteComponentProps} from 'react-router-dom';

export interface LoginProps extends RouteComponentProps{

}

export interface ILoginResponse {
    message: string;
    data: {
        tokenType: string,
        accessToken: string,
    };
}