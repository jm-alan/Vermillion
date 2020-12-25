import { useSelector } from 'react-redux';

import AnonHomePage from '../AnonHomePage';
import UserHomePage from '../UserHomePage';

export default function Home () {
  const user = useSelector(({ session: { user } }) => user);

  if (user) return <UserHomePage />;
  else return <AnonHomePage />;
}
