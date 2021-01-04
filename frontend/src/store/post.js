import csrfetch from './csrf';

const CREATE = 'post/CREATE';

const ENUMERATE = 'post/ENUMERATE';

const FAVORITE = 'post/FAVORITE';

const FAVS = 'post/FAVS';

const renderPost = () => ({ type: CREATE });

const untoFollower = list => ({ type: ENUMERATE, list });

const untoUser = hearts => ({ type: FAVS, hearts });

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

export const EnumerateFavs = () => async dispatch => {
  const heartsResponse = await csrfetch('/api/users/hearts');
  if (heartsResponse.data) dispatch(untoUser(heartsResponse.data.hearts));
};

export default function postReducer (state = { content: null, list: null }, { type, list, hearts, updatePost }) {
  switch (type) {
    case CREATE: return { ...state, updateFlow: true };
    case FAVORITE: return { ...state, updatePost };
    case ENUMERATE: return { ...state, list };
    case FAVS: return { ...state, hearts };
    default: return state;
  }
}
