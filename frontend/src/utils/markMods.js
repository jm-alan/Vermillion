import textMod from './textMod';

export const bold = (updater) => textMod('**', updater);

export const italic = (updater) => textMod('*', updater);

export const code = (updater) => textMod('`', updater);

export const img = (updater) => {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');

  updater(old => [
    old.substring(0, selectionStart),
      `![display text](${old.slice(selectionStart, selectionEnd) ||
        'https://www.example.com/image.jpg'})`,
      old.substring(selectionEnd, old.length)
  ].join(''));
};

export const link = (updater) => {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');
  updater(old => [
    old.substring(0, selectionStart),
    `[display text](${old.slice(selectionStart, selectionEnd) ||
      'https://www.example.com'})`,
    old.substring(selectionEnd, old.length)
  ].join(''));
};

export const codeblock = (updater) => {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');
  updater(old => [
    old.substring(0, selectionStart),
    `\`\`\`\n${old.slice(selectionStart, selectionEnd) ||
      'Codestuffs'}\n\`\`\``,
    old.substring(selectionEnd, old.length)
  ].join(''));
};
