import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import Post from './Post';
import { dirtySetFlowContainer } from '../../utils/dirtySetWidth';
import { EnumerateFlowContainer } from '../../store/post';

export default function FlowContainer () {
  const postList = useSelector(state => state.post ? state.post.list : null);
  const dispatch = useDispatch();

  const [pageErrors, updatePageErrors] = useState([]);

  useEffect(() => {
    dirtySetFlowContainer();
  }, []);

  useEffect(() => {
    dispatch(EnumerateFlowContainer())
      .catch(err => updatePageErrors(errs => [...errs, err]));
  }, [dispatch]);

  return (
    <div className='flowContainer'>
      {pageErrors.length ? <ul>{pageErrors.map(e => <li key={nanoid()}>{e.toString()}</li>)}</ul> : null}
      {
        postList && postList.length
          ? postList.map(post => <Post content={post} key={nanoid()} />)
          : <h1>Nothing to display here. Go follow some new people!</h1>
      }
    </div>
  );
}
