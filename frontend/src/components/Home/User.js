import { useEffect } from 'react';
import Container from '@material-ui/core/Container';

import RichTextEditor from '../RTE';
import * as SizeControl from '../../utils/magicSizeMachine';
import FlowContainer from '../FlowContainer';

export default function UserHomePage () {
  const dirtySetWidth = () => {
    const prettybounds = `${Math.min(document.documentElement.clientWidth - 48, 1000)}px`;
    SizeControl.setWidth(document.querySelector('div.RTE'), prettybounds);
    SizeControl.setWidth(document.querySelector('#preview'), `${SizeControl.getWidth(document.querySelector('div.RTE')) - 20}px`);
    document.querySelectorAll('div.post.card').forEach(post => SizeControl.setWidth(post, prettybounds));
  };

  useEffect(() => {
    window.onresize = dirtySetWidth;
    dirtySetWidth();
    return () => {
      window.onresize = null;
    };
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
