export default function demoLogin (dispatch, login) {
  const identification = document.querySelector('input.identification');
  const password = document.querySelector('input.password');
  const button = document.querySelector('button.login');
  typePretty(identification, 'demoMan');
  typePretty(password, 'password');
  setTimeout(() => {
    button.focus();
    setTimeout(() => {
      button.classList.add('falseActive');
      setTimeout(() => dispatch(login({ identification: 'demoMan', password: 'password' })), 100);
    }, 100);
  }, 800);
}

const typePretty = (field, toType) => {
  field.focus();

  let current = 0;
  const time = 80;

  const typeLetters = () => {
    field.value += toType[current];
    if (current < toType.length - 1) {
      current++;
      setTimeout(() => typeLetters(), time);
    } else {
      field.setAttribute('value', field.value);
    }
  };

  setTimeout(() => typeLetters(), time);
};
