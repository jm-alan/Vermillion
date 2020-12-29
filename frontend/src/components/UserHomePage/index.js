import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation';

import RichTextEditor from '../RTE';
import Post from '../Post';

export default function UserHomePage () {
  const user = useSelector(({ session: { user } }) => user);
  const [isInline, changeInline] = useState(true);

  return (
    <>
      <Navigation />
      <div id='displayController'>
        <button
          onClick={() => changeInline(display => !display)}
        >
          Display: {isInline ? 'inline' : 'side-by-side'}
        </button>
      </div>
      <div
        id='homeContainer'
        className={`container ${isInline ? 'default' : 'sideBySide'}`}
      >
        <RichTextEditor />
        <div className='flowContainer'>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <Post key={n} />)
          }
          <Post />
        </div>
      </div>
    </>
  );
}
