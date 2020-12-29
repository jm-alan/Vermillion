import { useState } from 'react';
import { useDispatch } from 'react-redux';
import sanitize from 'sanitize-html';
import markup from 'marked';

import placeholders from './placeholders';
import { bold, italic, link, img } from '../../utils/markMods';
import Preview from '../Preview';

const sanitizeOptions = {
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    img: ['src', 'alt']
  },
  allowedTags: [...sanitize.defaults.allowedTags, 'img']
};

const debouncer = () => {
  let interval;
  return (value, updater) => {
    if (interval) clearTimeout(interval);
    interval = setTimeout(() => {
      updater(sanitize(markup(value.toString()), sanitizeOptions));
    }, 500);
  };
};

const debouncePreviewUpdate = debouncer();

export default function RTE () {
  const dispatch = useDispatch();
  const editorBox = document.getElementById('postCreator');

  const [RTEtext, updateRTEtext] = useState('');
  const [previewContents, updatePreviewContents] = useState('');

  const buttonActions = {
    bold,
    italic,
    link,
    img,
    code: () => {}
  };
  const buttons = ['bold', 'italic', 'link', 'img', 'code'];
  const icons = {
    bold: <i className='fas fa-bold' />,
    italic: <i className='fas fa-italic' />,
    link: <i className='fas fa-link' />,
    img: <i className='fas fa-image' />,
    code: <i className='fas fa-code' />

  };

  return (
    <div className='RTE textEditor createPost'>
      <div id='editorBar'>
        {
            buttons.map(action => (
              <button
                key={action}
                title={action}
                className='editorButton'
                onClick={() => {
                  buttonActions[action]();
                  editorBox.innerText = window.getSelection().toString();
                  updatePreviewContents(sanitize(markup(editorBox.value.toString())));
                  editorBox.focus();
                }}
              >
                {icons[action]}
              </button>
            ))
        }
      </div>
      <div className='writeContainer container editbox'>
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
      <div className='lamb'>Preview:</div>
      <div className='previewContainer container'>
        <Preview contents={previewContents} />
      </div>
    </div>
  );
}
