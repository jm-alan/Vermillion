import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import Post from './Post';
import { dirtySetFlowContainer } from '../../utils/dirtySetWidth';
import { EnumerateFlowContainer } from '../../store/post';

export default function FlowContainer () {
  const postList = useSelector(state => state.post ? state.post.list : null);
  const updateFlow = useSelector(state => state.post ? state.post.updateFlow : null);
  const dispatch = useDispatch();
  const location = useLocation();
  const whereAmI = location.pathname;

  const [pageErrors, updatePageErrors] = useState([]);

  useEffect(() => {
    dirtySetFlowContainer();
  }, [postList]);

  useEffect(() => {
    updatePageErrors([]);
    dispatch(EnumerateFlowContainer(whereAmI.toString()))
      .catch(err => updatePageErrors(() => [err]));
  }, [dispatch, whereAmI, updateFlow]);

  return (
    <div className='flowContainer'>
      {pageErrors.length ? <ul>{pageErrors.map(e => <li key={nanoid()}>{e.toString()}</li>)}</ul> : null}
      {
        postList && postList.length
          ? postList.map(post => <Post content={post} key={nanoid()} />).reverse()
          : <h1>Nothing to show here, sorry.</h1>
      }
    </div>
  );
}
