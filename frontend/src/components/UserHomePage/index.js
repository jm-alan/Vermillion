import { useSelector } from 'react-redux';
import Navigation from '../Navigation';
import RichTextEditor from '../RTE';

export default function UserHomePage () {
  const user = useSelector(({ session: { user } }) => user);

  return (
    <>
      <Navigation />
      <RichTextEditor />
      <h1>
        This will be the homepage of a logged-in user!
        The current user is {user.username}!
      </h1>
    </>
  );
}
