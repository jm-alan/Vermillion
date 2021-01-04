import csrfetch from './csrf';

const CREATE = 'post/CREATE';

const ENUMERATE = 'post/ENUMERATE';

const FAVORITE = 'post/FAVORITE';

const renderPost = () => ({ type: CREATE });

const untoFollower = list => ({ type: ENUMERATE, list });

const favorite = () => ({ type: FAVORITE });

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

export const FavPost = postId => async dispatch => {
  const favoriteResponse = await csrfetch(`/api/posts/${postId}/hearts`, { method: 'POST' });
  if (favoriteResponse.data && favoriteResponse.data.success) dispatch(favorite(postId));
};

export default function postReducer (state = { content: null, list: null }, { type, list, updatePost }) {
  switch (type) {
    case CREATE: return { ...state, updateFlow: true };
    case FAVORITE: return { ...state, updatePost };
    case ENUMERATE: return { ...state, list };
    default: return state;
  }
}
