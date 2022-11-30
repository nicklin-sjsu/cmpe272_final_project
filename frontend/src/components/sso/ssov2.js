import React, { useEffect, useState } from 'react';
import { Modal, Tab, Tabs, Container } from "react-bootstrap";
import axios from 'axios';

const SSO = () => {

    const [loading, setLoading] = useState(true);
    const [identifier, setIdentifier] = useState({});

    useEffect(() => {
        console.log("hi");

        axios.get('http://localhost:5002/useridentity', { withCredentials: true })
            .then(res => {
                console.log("A:", res.data);
                if (res.data.user) {
                    //console.log("B:", res.data.user);
                    setIdentifier(res.data.user);
                    setLoading(false);
                } else {
                    redirectToLogin();
                }
            }).catch(err => {
                console.log(err);
                redirectToLogin();
            });

    }, []);

    const redirectToLogin = () => {
        window.location.replace("http://localhost:5002/login");
    }

    const SignOut = () => {
        /*axios.get('http://localhost:5002/logout')
            .then(res => {
                console.log(res);
                //window.location.replace("http://localhost:3000/");
            }).catch(err => {
                console.log(err);
            });*/
            console.log("failure");
    }

    if (loading) {
        return (
            <div>
                <p>loading...</p>

            </div>

        )
    }

    return (
        <div>
            <p>yov2</p>
            <br></br>
            <button onClick={SignOut}>PLS</button>
            <p>{identifier.nameID}</p>

        </div>
    )
}

export default SSO;


//<button onClick={redirectToLogin()}>PLS</button>