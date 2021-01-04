import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import FlowContainer from '../FlowContainer';

export default function Page () {
  let { page } = useParams();

  page = page.toString();

  return (
    <Container>
      {(page.match(/^\d+$/))
        ? (
          <h1>One day this will hold post #{page}!</h1>
          )
        : (
          <FlowContainer />
          )}
    </Container>
  );
}
