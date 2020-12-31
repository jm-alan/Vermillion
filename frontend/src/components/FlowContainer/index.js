import { useDispatch } from 'react-redux';

import Post from './Post';

export default function FlowContainer () {
  const dispatch = useDispatch();

  return (
    <div className='flowContainer'>
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <Post key={n} />)
      }
    </div>
  );
}
