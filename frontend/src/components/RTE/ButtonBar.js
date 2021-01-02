import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { bold, italic, link, image, code, codeblock } from '../../utils/markMods';

const buttons = [
  { type: 'bold', title: 'Bold - Highlight text (optional), then click or CTRL+B', icon: <i className='fas fa-bold' />, action: bold },
  { type: 'italic', title: 'Italic - Highlight text (optional), then click or CTRL+I', icon: <i className='fas fa-italic' />, action: italic },
  { type: 'link', title: 'Link - Highlight link address (optional), then click or CTRL+ALT+L', icon: <i className='fas fa-link' />, action: link },
  { type: 'image', title: 'Image - Click to upload, CTRL+ALT+I to add inline', icon: <i className='fas fa-image' />, action: image },
  { type: 'code', title: 'Code - Highlight text (optional), then click or CTRL+ALT+C', icon: <i className='fas fa-terminal' />, action: code },
  { type: 'codeblock', title: 'Codeblock - Highlight text (optional), then click or CTRL+ALT+SHIFT-C', icon: <i className='fas fa-code' />, action: codeblock }
];

export default function ButtonBar ({ updateRTEtext }) {
  return (
    <ButtonGroup
      id='editorBar'
      variant='contained'
    >
      {buttons.map(button => (
        <Button
          color='primary'
          key={button.type}
          title={button.title}
          className='editorButton'
          onClick={() => {
            button.action(updateRTEtext);
          }}
        >
          {button.icon}
        </Button>
      ))}
    </ButtonGroup>
  );
}
