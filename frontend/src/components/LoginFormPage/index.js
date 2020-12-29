import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LogIn } from '../../store/session';
import prettyLogin from '../../utils/prettyLogin';

export default function LoginFormPage () {
  const user = useSelector(({ session: { user } }) => user);
  const dispatch = useDispatch();
  const [identification, updateIdentification] = useState('');
  const [password, updatePassword] = useState('');
  const [errors, setErrors] = useState([]);

  const submit = (submit) => {
    submit.preventDefault();
    setErrors([]);
    dispatch(LogIn({ identification, password }))
      .catch(({ data: { errors } }) => {
        setErrors(errors);
      });
  };

  if (user) return <Redirect to='/' />;
  else {
    return (
      <div className='FormPage'>
        <div
          className='errors'
          style={{
            visibility: errors.length ? 'visible' : 'hidden',
            height: errors.length ? '50%' : 0,
            overflow: 'hidden'
          }}
        >
          <ul style={{ margin: '0px', padding: '0px' }} className='errorList'>
            {
          errors.map((err, idx) => <li key={idx}>{err}</li>)
        }
          </ul>
        </div>
        <form
          onSubmit={submit}
          className='form'
        >
          <input
            className='input identification'
            placeholder='Username or Email'
            name='username'
            type='text'
            value={identification}
            onChange={({ target: { value } }) => updateIdentification(value)}
            required
          />
          <input
            className='input password'
            placeholder='Password'
            name='password'
            type='password'
            value={password}
            onChange={({ target: { value } }) => updatePassword(value)}
            required
          />
          <button
            className='button login'
            type='submit'
          >Log In
          </button>
          <button
            type='button'
            className='button demo'
            onClick={() => prettyLogin(dispatch, LogIn)}
          >
            Demo User Login
          </button>
        </form>
      </div>
    );
  }
}
