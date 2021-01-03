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
  if (newPostResponse) dispatch(renderPost(newPostResponse.data));
  return newPostResponse;
};

export const EnumerateFlowContainer = whereAmI => async dispatch => {
  console.log(whereAmI);
  const fetchUrl = whereAmI === '/' ? '/api/posts/following' : `/api/users/${whereAmI}/posts`;
  const followedPostsResponse = await csrfetch(fetchUrl);
  console.log('Enumerated home post response:', followedPostsResponse);
  if (followedPostsResponse.data) dispatch(untoFollower(followedPostsResponse.data.posts));
};

export default function postReducer (state = { content: null, list: null }, { type, content, list }) {
  switch (type) {
    case CREATE: return { ...state, content };
    case ENUMERATE: return { ...state, list };
    default: return state;
  }
}
