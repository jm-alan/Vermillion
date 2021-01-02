import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from '../Navigation';

export default function Page () {
  let { page } = useParams();
  const user = useSelector(({ session: user }) => user);

  page = page.toString();
  if (page.match(/^\d+$/)) {
    return (
      <>
        <h1>One day this will hold post #{page}!</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>One day this might be the page of user {page}!</h1>
      </>
    );
  }
}
