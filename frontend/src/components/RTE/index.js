import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Title from './Title';
import ButtonBar from './ButtonBar';
import BodyBox from './BodyBox';
import Preview from './Preview';
import debouncer from '../../utils/debouncer';
import { CreatePost, EnumerateFlowContainer } from '../../store/post';
import { keyControlCreator } from './keycontroller';
import Error from '../Form/Error';

const newDebouncer = debouncer();

export default function RTE () {
  const dispatch = useDispatch();
  const location = useLocation();

  const [title, updateTitle] = useState('');
  const [RTEtext, updateRTEtext] = useState('');
  const [previewContents, updatePreviewContents] = useState('');
  const [pageErrors, updatePageErrors] = useState([]);

  const keyController = keyControlCreator(updateRTEtext);

  const postSubmit = () => {
    updatePageErrors([]);
    dispatch(CreatePost({ title, postBody: previewContents }))
      .then(() => {
        updateTitle('');
        updateRTEtext('');
        updatePreviewContents('');
      })
      .catch(err => updatePageErrors(() => err.data && err.data.message ? [err.data.message] : 'Something went wrong, please refresh the page and try again.'));
    dispatch(EnumerateFlowContainer(location.pathname.toString()));
  };

  useEffect(() => {
    newDebouncer(RTEtext, updatePreviewContents);
  }, [RTEtext]);

  useEffect(() => {
    const postBox = document.querySelector('textarea#postCreator');
    if (postBox) {
      postBox.addEventListener('keydown', keyController);
      return () => {
        postBox.removeEventListener('keydown', keyController);
      };
    }
  }, [keyController]);

  useEffect(() => {
    updatePageErrors([]);
  }, [RTEtext, title]);

  return (
    <div className='RTE textEditor'>
      <Error errors={pageErrors} bindHeight='40px' />
      <div className='writeContainer container editbox'>
        <Title title={title} updateTitle={updateTitle} />
        <ButtonBar updateRTEtext={updateRTEtext} />
        <BodyBox
          RTEtext={RTEtext}
          updateRTEtext={updateRTEtext}
          updatePreviewContents={updatePreviewContents}
        />
      </div>
      <div className='lamb'>
        <hr />
        Preview:
      </div>
      <Preview contents={previewContents} />
      <Button
        variant='contained'
        color='primary'
        className='submit createPost'
        onClick={postSubmit}
      >Post
      </Button>
    </div>
  );
}
