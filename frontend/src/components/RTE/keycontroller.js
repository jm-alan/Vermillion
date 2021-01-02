import * as keyActions from '../../utils/markMods';

export const keyControlCreator = updater => ({ ctrlKey, altKey, key }) => {
  if (ctrlKey) {
    switch (key) {
      case 'b': return keyActions.bold(updater);
      case 'i': return keyActions.italic(updater);
      default: return null;
    }
  } else if (ctrlKey && altKey) {
    switch (key) {
      case 'l': return keyActions.link(updater);
      case 'i': return keyActions.image(updater);
      default: return null;
    }
  }
};
