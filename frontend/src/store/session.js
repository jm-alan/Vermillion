import csrfetch from './csrf';

const USER = 'session/USER';

const constructSession = user => ({ type: USER, user });

const deconstructSession = () => ({ type: USER });

export const LogIn = ({ identification, password }) => async dispatch => {
  const loginResponse = await csrfetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ identification, password })
  });
  if (loginResponse) dispatch(constructSession(loginResponse.data.user));
};

export const LogOut = () => async dispatch => {
  const logoutResponse = await csrfetch('/api/session', { method: 'DELETE' });
  if (logoutResponse) dispatch(deconstructSession());
};

export const Restore = () => async dispatch => {
  const restoreResponse = await csrfetch('/api/session');
  if (restoreResponse) dispatch(constructSession(restoreResponse.data.user));
};

export const SignUp = ({ username, email, password }) => async dispatch => {
  const signupResponse = await csrfetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });
  if (signupResponse) dispatch(constructSession(signupResponse.data.user));
};

export const sessionReducer = (state = { user: null }, { type, user = null }) => (type === USER) ? { ...state, user } : state;
