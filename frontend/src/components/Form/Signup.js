import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { SignUp } from '../../store/session';
import Form from './';
import Input from './Input';

export default function Signup () {
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
      setErrors(() => []);
      return dispatch(SignUp({ email, username, password }))
        .catch(({ data: { errors } }) => {
          if (errors) setErrors(errors);
        });
    } else return setErrors(['Passwords do not match.']);
  };

  if (user) return <Redirect to='/' />;
  else {
    return (
      <Form errors={errors} submit={submit}>
        <Input type='email' value={email} onChange={setEmail} />
        <Input type='username' value={username} onChange={setUsername} />
        <Input type='password' value={password} onChange={setPassword} />
        <Input type='confirm password' value={confirmPassword} onChange={setConfirmPassword} />
        <button type='submit'>Sign Up</button>
      </Form>
    );
  }
}
