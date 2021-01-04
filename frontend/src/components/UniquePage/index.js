import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import FlowContainer from '../FlowContainer';
import NotFound from '../NotFound';

export default function Page () {
  let { page } = useParams();

  page = page.toString();

  return (
    <Container>
      {(page.match(/^\d+$/))
        ? (
          <h1>One day this will hold post #{page}!</h1>
          )
        : page.match(/^[a-zA-Z]+[a-zA-Z0-9-_]+$/)
          ? (
            <FlowContainer />
            )
          : <NotFound />}
    </Container>
  );
}
