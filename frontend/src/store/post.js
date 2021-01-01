import csrfetch from './csrf';

const CREATE = 'post/CREATE';

const ENUMERATE = 'post/ENUMERATE';

const renderPost = content => ({ type: CREATE, content });

const untoFollower = content => ({ type: ENUMERATE, content });

export const CreatePost = content => async dispatch => {
  const newPostResponse = await csrfetch('/api/posts', { method: 'POST', body: JSON.stringify({ content }) });
  if (newPostResponse) dispatch(renderPost(newPostResponse.data.newPost));
  return newPostResponse;
};

export const EnumerateHome = follower => async dispatch => {
  const followedPostsResponse = await csrfetch('/api/posts/following');
  if (followedPostsResponse) dispatch(untoFollower(followedPostsResponse.posts));
  return followedPostsResponse;
};

export default function postReducer (state = { content: null }, { type, content }) {
  switch (type) {
    case CREATE: return { ...state, content };
    default: return state;
  }
}
