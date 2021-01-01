import csrfetch from './csrf';

const CREATE = 'post/CREATE';

const ENUMERATE = 'post/ENUMERATE';

const renderPost = content => ({ type: CREATE, content });

const untoFollower = list => ({ type: ENUMERATE, list });

export const CreatePost = content => async dispatch => {
  const newPostResponse = await csrfetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ content })
  });
  if (newPostResponse) dispatch(renderPost(newPostResponse.data.newPost));
  return newPostResponse;
};

export const EnumerateHome = () => async dispatch => {
  const followedPostsResponse = await csrfetch('/api/posts/following');
  if (followedPostsResponse.data) dispatch(untoFollower(followedPostsResponse.data.posts));
};

export default function postReducer (state = { content: null, list: null }, { type, content, list }) {
  switch (type) {
    case CREATE: return { ...state, content };
    case ENUMERATE: return { ...state, list };
    default: return state;
  }
}
