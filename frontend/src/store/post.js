import csrfetch from './csrf';

const CREATE = 'post/CREATE';

const ENUMERATE = 'post/ENUMERATE';

const renderPost = content => ({ type: CREATE, content });

export const CreatePost = content => async dispatch => {
  const newPostResponse = await csrfetch('/api/posts', { method: 'POST', body: JSON.stringify({ content }) });
  console.log('new post response:', newPostResponse);
  if (newPostResponse) dispatch(renderPost(newPostResponse));
  return newPostResponse;
};

export const EnumerateHome = follower => async dispatch => {
    const followedPostsResponse = await csrfetch('/api/posts/following');
}

export default function postReducer (state = { content: null }, { type, content }) {
  switch (type) {
    case CREATE: return { ...state, content };
    default: return state;
  }
}
