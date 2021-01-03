import * as SizeControl from './magicSizeMachine';

export const dirtySetRTE = () => {
  const prettyBounds = `${Math.min(document.documentElement.clientWidth - 48, 1000)}px`;
  SizeControl.setWidth(document.querySelector('div.RTE'), prettyBounds);
  SizeControl.setWidth(document.querySelector('#preview'), `${SizeControl.getWidth(document.querySelector('div.RTE')) - 20}px`);
};

export const dirtySetFlowContainer = () => {
  document.querySelectorAll('div.post.card')
    .forEach(post => {
      SizeControl.setWidth(post, `${Math.min(document.documentElement.clientWidth - 68, 980)}px`);
    });
};

export const dirtySetAll = () => {
  dirtySetRTE();
  dirtySetFlowContainer();
};
