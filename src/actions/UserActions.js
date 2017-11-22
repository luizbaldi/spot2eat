import { ref as firebase, auth } from '../util/fire';
import _ from 'lodash';

/* Action Types */
export const SET_USER      = 'SET_USER';

/* Action Creators */
export function doLogin(userData, success, error) {
    return dispatch => {
        firebase.child('users').on('value', snapshot => {
            const users = snapshot.val();
            console.log('Called firebase users listener', users);
            let currentUser = _.find(users, user => {
                return userData.username === user.username && userData.password === user.password;
            });
            if (currentUser) {
                success(currentUser);
                setUser(currentUser); 
            } else {
                error();
            }
        });
    }
};

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    };
}