export default function textMod (symbol, updater) {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');

  updater(old => [
    old.substring(0, selectionStart),
    `${symbol}${old.slice(selectionStart, selectionEnd) ||
    'Your text here'}${symbol}`,
    old.substring(selectionEnd, old.length)
  ].join(''));
}
