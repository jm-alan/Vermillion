import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import placeholders from './placeholders';
import { bold, italic, link, img, code, codeblock } from '../../utils/markMods';
import Preview from '../Preview';
import previewDebouncer from '../../utils/previewDebouncer';

const debouncePreviewUpdate = previewDebouncer();

export default function RTE () {
  const dispatch = useDispatch();

  const [RTEtext, updateRTEtext] = useState('');
  const [previewContents, updatePreviewContents] = useState('');

  const buttonActions = {
    bold,
    italic,
    link,
    img,
    code,
    codeblock
  };
  const buttons = ['bold', 'italic', 'link', 'img', 'code', 'codeblock'];
  const icons = {
    bold: <i className='fas fa-bold' />,
    italic: <i className='fas fa-italic' />,
    link: <i className='fas fa-link' />,
    img: <i className='fas fa-image' />,
    code: <i className='fas fa-terminal' />,
    codeblock: <i className='fas fa-code' />
  };

  useEffect(() => {
    debouncePreviewUpdate(RTEtext, updatePreviewContents);
  }, [RTEtext]);

  return (
    <div className='RTE textEditor createPost'>
      <div className='writeContainer container editbox'>
        <input
          className='title'
          type='text'
          placeholder='Title'
        />
        <div id='editorBar'>
          {
            buttons.map(action => (
              <button
                key={action}
                title={action}
                className='editorButton'
                onClick={() => {
                  buttonActions[action](updateRTEtext);
                }}
              >
                {icons[action]}
              </button>
            ))
          }
        </div>
        <textarea
          id='postCreator'
          placeholder={`${placeholders[Math.round(Math.random() * 4)]}`}
          onChange={
            ({ target: { value } }) => {
              updateRTEtext(() => value.toString());
              debouncePreviewUpdate(value, updatePreviewContents);
            }
          }
          value={RTEtext}
        />
      </div>
      <div className='lamb'>
        <hr />
        Preview:
      </div>
      <div className='previewContainer container'>
        <Preview contents={previewContents} />
      </div>
    </div>
  );
}
