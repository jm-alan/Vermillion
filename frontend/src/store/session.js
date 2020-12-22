import csrfetch from './csrf';

const USER = 'session/USER';

const constructSession = user => ({ type: USER, user });

const deconstructSession = () => ({ type: USER });

export const LogIn = ({ identification, password }) => async dispatch => {
  const loginResponse = await csrfetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ identification, password })
  });
  if (loginResponse) dispatch(constructSession(loginResponse.data.user));
  return loginResponse;
};

export const LogOut = () => async dispatch => {
  const logoutResponse = await csrfetch('/api/session', { method: 'DELETE' });
  if (logoutResponse) dispatch(deconstructSession());
  return logoutResponse;
};

export default function sessionReducer (
  state = { user: null },
  { type, user = null }
) {
  if (type === USER) return { ...state, user };
  else return state;
}
