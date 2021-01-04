import * as SizeControl from './magicSizeMachine';

let outerBounds;
let innerBounds;

export const dirtySetRTE = () => {
  outerBounds = Math.max(Math.min(document.documentElement.clientWidth - 48, 1000), 285);
  innerBounds = outerBounds - 20;
  SizeControl.setWidth(document.querySelector('div.RTE'), `${outerBounds}px`);
  SizeControl.setWidth(document.querySelector('#preview'), `${innerBounds}px`);
};

export const dirtySetFlowContainer = () => {
  document.querySelectorAll('div.post.card')
    .forEach(post => {
      SizeControl.setWidth(post, `${innerBounds}px`);
    });
};

export const dirtySetAll = () => {
  dirtySetRTE();
  dirtySetFlowContainer();
};
