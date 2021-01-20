import csrfetch from './csrf';

export const CheckIfExists = username => async () => {
  const validateExistenceResponse = await csrfetch(`/api/users/${username}`);
  return validateExistenceResponse.data.user;
};
