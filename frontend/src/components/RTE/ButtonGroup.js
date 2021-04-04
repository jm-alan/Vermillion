import * as buttonActions from '../../utils/markMods';

export default function ButtonGroup ({ buttons, updateRTEtext }) {
  return (
    <div className='editorBar'>
      {buttons.map((button, idx) => (
        <button
          key={button.type}
          title={button.title}
          className={`editorButton ${idx === 0 && 'first'} ${idx === buttons.length - 1 && 'last'}`}
          onClick={() => {
            buttonActions[button.type](updateRTEtext);
          }}
        >
          {button.icon}
        </button>))}
    </div>
  );
}
