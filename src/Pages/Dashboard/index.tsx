import React, {useCallback} from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IDashboard extends RouteComponentProps {

}

const Dashboard = (props: IDashboard) => {
    const doLogout = useCallback(() => {
        localStorage.removeItem('userAuthToken');
        props.history.push('/');
    }, []);

    return (
        <div>
            <button onClick={doLogout}>Logout</button>
        </div>
    )
}

export const DashboardPage = withRouter(Dashboard);