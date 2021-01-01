import { useSelector } from 'react-redux';

import AnonHomePage from './Anon';
import UserHomePage from './User';

export default function Home () {
  const user = useSelector(({ session: { user } }) => user);

  if (user) return <UserHomePage />;
  else return <AnonHomePage />;
}
