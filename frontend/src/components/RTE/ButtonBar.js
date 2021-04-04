import { useState } from 'react';

import ButtonGroup from './ButtonGroup';

const buttonsBasic = [
  { type: 'bold', title: 'Bold - Highlight text (optional), then click or CTRL+B', icon: <i className='fas fa-bold' /> },
  { type: 'italic', title: 'Italic - Highlight text (optional), then click or CTRL+I', icon: <i className='fas fa-italic' /> },
  { type: 'link', title: 'Link - Highlight link address (optional), then click or CTRL+ALT+L', icon: <i className='fas fa-link' /> },
  { type: 'image', title: 'Image - Highlight image address (optional), then click or CTRL+ALT+I', icon: <i className='fas fa-image' /> }
];

const buttonsAdv1 = [
  { type: 'code', title: 'Code - Highlight text (optional), then click or CTRL+ALT+C', icon: <i className='fas fa-terminal' /> },
  { type: 'codeblock', title: 'Codeblock - Highlight text (optional), then click or CTRL+ALT+SHIFT-C', icon: <i className='fas fa-code' /> },
  { type: 'blockquote', title: 'Blockquote - Highlight text (optional), then click or CTRL+ALT+Q', icon: <><i className='fas fa-quote-left' /><i className='fas fa-quote-right' /></> },
  { type: 'bulletlist', title: 'Bulleted list - Highlight rows (optional), then click or CTRL+ALT+U to bullet or add new row', icon: <i className='fas fa-list-ul' /> },
  { type: 'numberlist', title: 'Numbered list - Highlight rows (optional), then click or CTRL+ALT+O to number or add new row', icon: <i className='fas fa-list-ol' /> }
];

const buttonsAdv2 = [
  { type: 'H1', title: 'Heading 1', icon: 'H1' },
  { type: 'H2', title: 'Heading 2', icon: 'H2' },
  { type: 'H3', title: 'Heading 3', icon: 'H3' },
  { type: 'H4', title: 'Heading 4', icon: 'H4' },
  { type: 'H5', title: 'Heading 5', icon: 'H5' },
  { type: 'H6', title: 'Heading 6', icon: 'H6' }
];

const table = [
  { type: 'table', title: 'Table - coming soon!', icon: <i className='fas fa-table' /> }
];

export default function ButtonBar ({ updateRTEtext }) {
  const [expanded, toggleExpanded] = useState(false);
  const toggle = () => toggleExpanded(expanded => !expanded);

  return (
    <div className='buttonContainer'>
      <div className={`buttonContainer ${expanded ? 'expanded' : 'unexpanded'}`}>
        <ButtonGroup buttons={buttonsBasic} updateRTEtext={updateRTEtext} />
        <ButtonGroup buttons={buttonsAdv1} updateRTEtext={updateRTEtext} />
        <ButtonGroup buttons={buttonsAdv2} updateRTEtext={updateRTEtext} />
        <ButtonGroup buttons={table} updateRTEtext={updateRTEtext} />
      </div>
      <button id='editExpand' onClick={toggle}>
        {expanded
          ? <i className='fas fa-caret-up' />
          : <i className='fas fa-caret-down' />}
      </button>
    </div>
  );
}
