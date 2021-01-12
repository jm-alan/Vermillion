import csrfetch from './csrf';

export const Follow = username => async () => {
  const followUserResponse = await csrfetch(`/api/users/${username}/followers`, { method: 'POST' });
  if (followUserResponse.data && followUserResponse.data.success) return followUserResponse.data.success;
};
