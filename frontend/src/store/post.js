import csrfetch from './csrf';

const CREATE = 'post/CREATE';
const UPDATE = 'post/UPDATE';
const ENUMERATE = 'post/ENUMERATE';

const renderPost = () => ({ type: CREATE });
const untoFollower = list => ({ type: ENUMERATE, list });
const ownerInteraction = (postId, component, payload) => ({ type: UPDATE, postId, component, payload });

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

export const UpdatePost = (postId, component, payload) => async dispatch => {
  const updatePostResponse = await csrfetch(`/api/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ component, payload })
  });
  if (updatePostResponse.data && updatePostResponse.data.success) dispatch(ownerInteraction(postId, component, payload));
};

export const TouchPost = (postId, type) => async dispatch => {
  const { data } = await csrfetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ type })
  });
  const { result } = data ?? { result: false };
  if (data && result) return result;
};

export default function postReducer (state = { content: null, list: null }, { type, list, postId, component, payload, result }) {
  switch (type) {
    case CREATE: return { ...state, updateFlow: true };
    case ENUMERATE: return { ...state, list };
    case UPDATE: return { ...state, postId, component, payload };
    default: return state;
  }
}
