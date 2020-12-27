export default function (symbol) {
  const RTEinput = document.getElementById('postCreator');

  const {
    value: oldValue,
    selectionStart,
    selectionEnd
  } = RTEinput;

  const chopText = oldValue.slice(selectionStart, selectionEnd);

  RTEinput.value = [
    oldValue.substring(0, selectionStart),
    symbol,
    chopText,
    symbol,
    oldValue.substring(selectionEnd, oldValue.length)
  ].join('');
}
