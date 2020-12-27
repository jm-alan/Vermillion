import textMod from './textMod';
export const bold = () => textMod('**');
export const italic = () => textMod('*');
export const link = () => {
  const RTEinput = document.getElementById('postCreator');
  const { value, selectionStart, selectionEnd } = RTEinput;
  const chopText = value.slice(selectionStart, selectionEnd);
  if (chopText) {
    RTEinput.value = [
      value.substring(0, selectionStart),
      `[display text](${chopText})`,
      value.substring(selectionEnd, value.length)
    ].join('');
  } else {
    RTEinput.value = [
      value.substring(0, selectionStart),
      '[display text](https://example.website.com)',
      value.substring(selectionEnd, value.length)
    ].join('');
  }
};
