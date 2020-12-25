import { useSelector } from 'react-redux';
import Navigation from '../Navigation';

export default function UserHomePage () {
  const user = useSelector(({ session: { user } }) => user);

  return (
    <>
      <Navigation />
      <h1>
        This will be the homepage of a logged-in user!
        The current user is {user.username}!
      </h1>
    </>
  );
}
