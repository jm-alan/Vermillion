import { useSelector } from 'react-redux';
import Navigation from '../Navigation';
import RichTextEditor from '../RTE';
import Post from '../Post';

export default function UserHomePage () {
  const user = useSelector(({ session: { user } }) => user);

  return (
    <>
      <Navigation />
      <div id='homeContainer' className='container'>
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
