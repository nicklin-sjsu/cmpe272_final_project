import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import AdminNav from '../nav/admin_nav';
import User from '../user/user_details';
import { isEmpty } from '../utils';

class ViewUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AdminNav />
                <br />
                <Container>
                    <User />
                </Container>
                <br />
            </>
        );
    }
}

export default ViewUser;
