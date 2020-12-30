import csrfetch from './csrf';

const CREATE = 'post/CREATE';

const createPost = content => ({ type: CREATE, content });

export const createPost = ()
