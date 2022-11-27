import {
    SET_USER,
} from './actionTypes';

export const setUser = user => {
    return {
        type: SET_USER,
        user,
    };
};

export const getUser = token => {
    const user = {
        "emp_no": 10001,
        "birth_date": "1953-09-02T07:00:00.000Z",
        "first_name": "Georgi",
        "last_name": "Facello",
        "gender": "M",
        "hire_date": "1986-06-26T07:00:00.000Z",
        "salary": 88958,
        "title": "Senior Engineer",
        "level": "admin",
    };
    return dispatch => (dispatch(setUser(user)));
    //const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
    //return dispatch => (fetch(api + "/verify",
    //    {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify({
    //            'token': token,
    //        }),
    //    }
    //)
    //    .then((response) => response.json())
    //    .then((data) => {
    //        if (data.code === 200) {
    //            const user = {
    //                id: data.data.user.id,
    //                phone: data.data.user.phone_number,
    //                firstName: data.data.user.first_name,
    //                lastName: data.data.user.last_name,
    //                level: data.data.user.level,
    //                token: token,
    //            }
    //            dispatch(setUser(user));
    //        }
    //    })
    //)

}
