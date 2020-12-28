export default function textMod (symbol) {
  const RTEinput = document.getElementById('postCreator');

  const { value, selectionStart, selectionEnd } = RTEinput;

  const chopText = value.slice(selectionStart, selectionEnd);

  RTEinput.value = [
    value.substring(0, selectionStart),
    `${symbol}${chopText}${symbol}`,
    value.substring(selectionEnd, value.length)
  ].join('');
}
