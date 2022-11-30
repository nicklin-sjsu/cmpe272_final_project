import React from 'react';
import store from '../../store';
import { setUser } from '../../actions/userActions';

class SSO extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getIdentity();
    }

    getIdentity() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:5002";
        fetch(api + '/useridentity?' + new URLSearchParams({ withCredentials: true }))
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    this.redirectToLogin();
                }
            })
            .then((data) => {
                store.dispatch(setUser(data.data.user));
            });
    }
    redirectToLogin () {
        window.location.replace(process.env.REACT_APP_LOGIN || "http://localhost:5002/login");
    }

    render() {
        return (
            <></>
        )
    }
}
export default SSO;
