import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { SignUp } from '../../store/session';

export default function SignupFormPage () {
  const dispatch = useDispatch();
  const user = useSelector(({ session: { user } }) => user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const submit = (submit) => {
    submit.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(SignUp({ email, username, password }))
        .catch(({ data: { errors } }) => {
          if (errors) setErrors(errors);
        });
    } else return setErrors(['Confirm Password field must be the same as the Password field']);
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
          <ul className='errorList'>
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
            type='text'
            placeholder='email@website.com'
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            required
          />
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={({ target: { value } }) => setConfirmPassword(value)}
            required
          />

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    );
  }
}
