import firebase from '../util/fire';
import _ from 'lodash';

/* Action Types */
export const SET_USER      = 'SET_USER';

/* Action Creators */
export function doLogin(userData, success, error) {
    return dispatch => {
        firebase.child('users').on('value', snapshot => {
            const users = snapshot.val();
            let currentUser = _.find(users, user => {
                return userData.username === user.username && userData.password === user.password;
            });
            if (currentUser) {
                success();
                return {
                    type: SET_USER,
                    payload: currentUser
                }; 
            } else {
                error();
            }
        });
    }
};

export function simulateLogin(user) {
    return {
        type: SET_USER,
        payload: user
    };
}

export function setUser() {
    return 'potatoe';
}