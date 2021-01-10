import csrfetch from './csrf';

const CREATE = 'post/CREATE';

const ENUMERATE = 'post/ENUMERATE';

const renderPost = () => ({ type: CREATE });

const untoFollower = list => ({ type: ENUMERATE, list });

export const CreatePost = content => async dispatch => {
  const newPostResponse = await csrfetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ content })
  });
  if (newPostResponse.data) dispatch(renderPost(newPostResponse.data));
};

export const EnumerateFlowContainer = whereAmI => async dispatch => {
  const fetchUrl = whereAmI === '/' ? '/api/posts/following' : `/api/users/${whereAmI}/posts`;
  const followedPostsResponse = await csrfetch(fetchUrl);
  if (followedPostsResponse.data) dispatch(untoFollower(followedPostsResponse.data.posts));
};

export default function postReducer (state = { content: null, list: null }, { type, list, hearts, updatePost }) {
  switch (type) {
    case CREATE: return { ...state, updateFlow: true };
    case ENUMERATE: return { ...state, list };
    default: return state;
  }
}
