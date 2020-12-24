import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as classes from './index.css';
import { LogIn } from '../../store/session';
import { Redirect } from 'react-router-dom';

export default function LoginFormPage () {
  console.log(classes);
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
      <div className={classes.Testing}>
        <div
          className={classes.errors}
          style={{
            visibility: errors.length ? 'visible' : 'hidden',
            height: errors.length ? '50%' : 0,
            overflow: 'hidden'
          }}
        >
          <ul style={{ margin: '0px', padding: '0px' }} className={classes.errorList}>
            {
          errors.map((err, idx) => <li key={idx}>{err}</li>)
        }
          </ul>
        </div>
        <form
          onSubmit={submit}
          className={classes.form}
        >
          <input
            className={classes.input}
            placeholder='Username or Email'
            name='username'
            type='text'
            value={identification}
            onChange={({ target: { value } }) => updateIdentification(value)}
            required
          />
          <input
            className={classes.input}
            placeholder='Password'
            name='password'
            type='password'
            value={password}
            onChange={({ target: { value } }) => updatePassword(value)}
            required
          />
          <button className={classes.button} type='submit'>Log In</button>
        </form>
      </div>
    );
  }
}
