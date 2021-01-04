import { useEffect } from 'react';
import Container from '@material-ui/core/Container';

import Eddie from '../RTE';
import FlowContainer from '../FlowContainer';
import { dirtySetRTE, dirtySetAll } from '../../utils/dirtySetWidth';

export default function UserHomePage () {
  useEffect(() => {
    window.onresize = dirtySetAll;
    dirtySetRTE();
    return () => {
      window.onresize = null;
    }
    ;
  }, []);

  return (
    <>
      <Container
        id='homeContainer'
      >
        <Eddie />
        <FlowContainer />
      </Container>
    </>
  );
}
