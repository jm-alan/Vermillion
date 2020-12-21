import csrfetch from './csrf';

const LOGIN = 'session/LOGIN';

const LOGOUT = 'session/LOGOUT';

const constructSession = (user) => ({ type: LOGIN, user });

const deconstructSession = () => ({ type: LOGOUT });

export const thunkLogin = (dispatch, { identification, password }) => {
  csrfetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: { identification, password }
  });
  dispatch(constructSession());
};

const sessionReducer = (state = {}, action) => {

};
