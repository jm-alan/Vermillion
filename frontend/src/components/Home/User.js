import { useEffect } from 'react';
import Container from '@material-ui/core/Container';

import RichTextEditor from '../RTE';
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
        <RichTextEditor />
        <FlowContainer />
      </Container>
    </>
  );
}
