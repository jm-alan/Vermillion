import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

import RichTextEditor from '../RTE';
import * as SizeControl from '../../utils/magicSizeMachine';
import FlowContainer from '../FlowContainer';
import { EnumerateHome } from '../../store/post';

export default function UserHomePage () {
  const dispatch = useDispatch();
  const dashboardList = useSelector(state => state.post ? state.post.list : null);

  const [pageErrors, updatePageErrors] = useState([]);

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

  useEffect(() => {
    dispatch(EnumerateHome())
      .catch(err => updatePageErrors(errs => [...errs, err]));
  }, [dispatch]);

  return (
    <>
      <Container
        id='homeContainer'
      >
        <RichTextEditor />
        <FlowContainer
          postList={dashboardList}
          pageErrors={pageErrors}
        />
      </Container>
    </>
  );
}
