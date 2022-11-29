import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeesPage from './admin/employees_page';
import UserPage from './user/user_page';
import UserDetails from './user/user_details';
import ManagePage from './user/manage_page';
import DepartmentsPage from './admin/departments_page';
import TitlesPage from './admin/titles_page';
import SSO from './sso/signin';
import Error from './error/error';
import { getUser } from '../actions/userActions';
import store from '../store';
import { connect } from 'react-redux';
import { isEmpty } from './utils';

class routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: true,
        }
    }

    componentDidMount() {
        if (isEmpty(this.props.user)) {
            //const token = sessionStorage.getItem("token");
            //store.dispatch(getUser(token));
            store.dispatch(getUser());
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Routes>
                {this.state.error || this.state.loading
                    ?
                    <>
                        <Route exact path="*" element={<Error />} />
                    </>
                    :
                    <>
                        {
                            this.props.user && this.props.user.level === 'admin' ?
                                <>
                                    <Route exact path="/employees" element={<EmployeesPage />} />
                                    <Route exact path="/user" element={<UserPage />} />
                                    <Route exact path="/edituser" element={<ManagePage mode="edit" />} />
                                    //<Route exact path="/adduser" element={<ManagePage mode="add" />} />
                                    <Route exact path="/departments" element={<DepartmentsPage />} />
                                    <Route exact path="/titles" element={<TitlesPage />} />
                                    <Route exact path="/sso" element={<SSO />} />
                                </>
                                :
                                <>
                                    <Route exact path="/user" element={<UserDetails />} />
                                </>
                        }
                    </>
                }
            </Routes>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    }
}

export default connect(mapStateToProps)(routes); 