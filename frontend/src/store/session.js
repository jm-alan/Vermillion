import csrfetch from './csrf';

const LOGIN = 'session/LOGIN';

const LOGOUT = 'session/LOGOUT';

const constructSession = (user) => ({ type: LOGIN, user });

const deconstructSession = () => ({ type: LOGOUT });

export const thunkLogin = (dispatch, { identification, password }) => {
  const attemptLogin = csrfetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: { identification, password }
  });
  if (attemptLogin) {
    const {
      data: {
        user: { id, username }
      }
    } = attemptLogin;
    dispatch(constructSession());
  }
};

export const thunkLogout = (dispatch) => {
  const attemptLogout = csrfetch('/api/session', { method: 'DELETE' });
};

const sessionReducer = (state = {}, action) => {

};
