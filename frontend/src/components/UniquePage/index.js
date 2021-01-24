import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import BlogHeader from './BlogHeader';
import FlowContainer from '../FlowContainer';
import NotFound from '../NotFound';
import { CheckIfExists } from '../../store/user';

export default function Page () {
  let { page } = useParams();
  const dispatch = useDispatch();

  page = page.toString();

  const [matchesAndExists, setMatchesAndExists] = useState(false);

  useEffect(() => {
    if (page.match(/^[a-zA-Z]+[a-zA-Z0-9-_]+$/)) {
      dispatch(CheckIfExists(page))
        .then(user => user ? setMatchesAndExists(true) : {});
    }
  }, [page, dispatch]);
  return (
    (page.match(/^\d+$/))
      ? (
        <h1>One day this will hold post #{page}!</h1>
        )
      : matchesAndExists
        ? (
          <Container>
            <BlogHeader page={page} />
            <FlowContainer />
          </Container>
          )
        : <NotFound />
  );
}
