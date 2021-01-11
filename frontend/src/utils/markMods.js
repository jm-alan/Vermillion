import textMod from './textMod';

export const bold = updater => textMod(updater, '**');
export const italic = updater => textMod(updater, '*');
export const code = updater => textMod(updater, '`');
export const codeblock = updater => textMod(updater, '```\n', '\n```');
export const link = updater => textMod(updater, '[display text](', ')', 'https://www.example.com/');
export const image = updater => textMod(updater, '![text to display if image fails to load](', ')', 'https://www.example.com/image.jpg');
export const H1 = updater => textMod(updater, '# ', '\n', 'Heading 1');
export const H2 = updater => textMod(updater, '## ', '\n', 'Heading 2');
export const H3 = updater => textMod(updater, '### ', '\n', 'Heading 3');
export const H4 = updater => textMod(updater, '#### ', '\n', 'Heading 4');
export const H5 = updater => textMod(updater, '##### ', '\n', 'Heading 5');
export const H6 = updater => textMod(updater, '###### ', '\n', 'Heading 6');

export const blockquote = updater => {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');
  updater(old => `${old.slice(0, selectionStart)}\n>${old.slice(selectionStart, selectionEnd) || 'Your quote here'}\n${old.slice(selectionEnd, old.length)}`);
};

export const bulletlist = updater => {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');
  updater(old => {
    const chopText = old.slice(selectionStart, selectionEnd);
    const toInsert = chopText.length ? chopText.split('\n').map(line => '- ' + line).join('\n') : '\n- ';
    return `${old.slice(0, selectionStart)}\n${toInsert}\n${old.slice(selectionEnd, old.length)}`;
  });
};

export const numberlist = updater => {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');
  updater(old => {
    const chopText = old.slice(selectionStart, selectionEnd);
    const toInsert = chopText.length ? chopText.split('\n').map(line => '1. ' + line).join('\n') : '\n1. ';
    return `${old.slice(0, selectionStart)}\n${toInsert}\n${old.slice(selectionEnd, old.length)}`;
  });
};
