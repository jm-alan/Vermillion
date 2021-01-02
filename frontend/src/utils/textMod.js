export default function textMod (updater, startSymbol, endSymbol = null, noInput = 'Your text here') {
  const { selectionStart, selectionEnd } = document.getElementById('postCreator');
  updater(old => `${old.substring(0, selectionStart)}${startSymbol}${old.slice(selectionStart, selectionEnd) || noInput}${endSymbol ?? startSymbol}${old.substring(selectionEnd, old.length)}`);
}
