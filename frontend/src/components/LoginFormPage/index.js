import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import { LogIn } from '../../store/session';
import { Redirect } from 'react-router-dom';

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

  return (
    <div className='login'>
      <div className='errors' style={{ visibility: errors.length ? 'visible' : 'hidden' }}>
        <ul style={{ margin: '0px', padding: '0px' }}>
          {
          errors.map((err, idx) => <li key={idx}>{err}</li>)
        }
        </ul>
      </div>
      <form
        onSubmit={submit}
      >
        <input
          placeholder='Username or Email'
          name='username'
          type='text'
          value={identification}
          onChange={({ target: { value } }) => updateIdentification(value)}
        />
        <input
          placeholder='Password'
          name='password'
          type='password'
          value={password}
          onChange={({ target: { value } }) => updatePassword(value)}
        />
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}
