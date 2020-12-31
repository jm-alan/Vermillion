import { bold, italic, link, img, code, codeblock } from '../../utils/markMods';

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

export default function ButtonBar ({ updateRTEtext }) {
  return (
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
  );
}
