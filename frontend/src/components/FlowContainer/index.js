import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post';
import { EnumerateHome } from '../../store/post';

export default function FlowContainer () {
  const newPost = useSelector(state => state.post ? state.post.content : null);

  const [pageErrors, updatePageErrors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EnumerateHome())
      .catch(err => updatePageErrors(errs => [...errs, err]));
  }, [dispatch]);

  return (
    <div className='flowContainer'>
      {pageErrors.length ? <ul>{pageErrors.map(e => <li key={e}>{e.message}</li>)}</ul> : null}
      {newPost ? <Post content={newPost.content} /> : null}
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <Post content={{ title: n, body: n }} key={n} />)
      }
    </div>
  );
}
