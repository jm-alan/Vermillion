import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import Post from './Post';

export default function FlowContainer ({ pageErrors, postList }) {
  const newPost = useSelector(state => state.post ? state.post.content : null);

  useEffect(() => {
  }, [newPost]);

  return (
    <div className='flowContainer'>
      {pageErrors.length ? <ul>{pageErrors.map(e => <li key={nanoid()}>{e.message}</li>)}</ul> : null}
      {
        postList && postList.length
          ? postList.map(post => <Post content={post} key={nanoid()} />)
          : <h1>Nothing to display here. Go follow some new people!</h1>
      }
    </div>
  );
}
