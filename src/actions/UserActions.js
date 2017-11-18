/* Action Types */
export const SET_USER      = 'SET_USER';

/* Action Creators */
export function setUser(currentUser) {
    return {
        type: SET_USER,
        payload: currentUser
    };
};
