import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './main/main';
import Admin from './admin/admin';
import ViewUser from './admin/view_user';
import RestaurantMain from './restaurant/restaurant_main';
import UserDetails from './user/user_details';
import ManageUser from './user/manage_user';
import SSO from './sso/signin';
import Error from './error/error';
import { getUser } from '../actions/userActions';
import { getRestaurant, getMenu, getAdminRestaurant, getDefaultUserId } from '../actions/restaurantActions';
import { getOrder } from '../actions/orderActions';
import store from '../store';
import { connect } from 'react-redux';
import { isEmpty } from './utils';
import CheckoutPage from './checkout/checkout_page';

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
                                    <Route exact path="/admin" element={<Admin />} />
                                    <Route exact path="/user" element={<ViewUser />} />
                                    <Route exact path="/edituser" element={<ManageUser mode="edit" />} />
                                    <Route exact path="/adduser" element={<ManageUser mode="add" />} />
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