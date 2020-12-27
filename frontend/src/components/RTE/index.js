import { useState } from 'react';
import { useDispatch } from 'react-redux';
import sanitize from 'sanitize-html';
import markup from 'marked';

import placeholders from './placeholders';
import { bold, italic } from '../../utils/markMods';

const sanitizeOptions = { allowedAttributes: { ...sanitize.defaults.allowedAttributes, img: ['src', 'alt'] }, allowedTags: [...sanitize.defaults.allowedTags, 'img'] };

export default function RTE () {
  const dispatch = useDispatch();
  const editorBox = document.getElementById('postCreator');
  const preview = document.getElementById('preview');

  const [RTEtext, updateRTEtext] = useState('');

  const buttonActions = {
    bold,
    italic,
    link: () => {},
    img: () => {},
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
                  preview.innerHTML = editorBox
                    ? sanitize(markup(editorBox.value.toString()), sanitizeOptions)
                    : preview.innerHTML;
                  editorBox.focus();
                }}
              >
                {icons[action]}
              </button>
            ))
        }
      </div>
      <div className='writeContainer'>
        <textarea
          id='postCreator'
          placeholder={`${placeholders[Math.round(Math.random() * 4)]}`}
          onChange={
            ({ target: { value } }) => {
              updateRTEtext(() => value.toString());
              if (preview) {
                preview.innerHTML = editorBox
                  ? sanitize(markup(editorBox.value.toString()), sanitizeOptions)
                  : preview.innerHTML;
              }
            }
        }
          value={RTEtext}
        />
        <div id='preview' />
      </div>
    </div>
  );
}
