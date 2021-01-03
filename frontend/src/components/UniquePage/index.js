import { useParams } from 'react-router-dom';

import FlowContainer from '../FlowContainer';

export default function Page () {
  let { page } = useParams();

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
        <FlowContainer />
      </>
    );
  }
}
