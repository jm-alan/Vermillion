import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LogIn } from '../../store/session';
import prettyLogin from '../../utils/prettyLogin';
import Form from './';
import Input from './Input';

export default function Login () {
  const user = useSelector(({ session: { user } }) => user);
  const dispatch = useDispatch();
  const [identification, updateIdentification] = useState('');
  const [password, updatePassword] = useState('');
  const [errors, setErrors] = useState([]);

  const submit = (submit) => {
    submit.preventDefault();
    setErrors(() => []);
    dispatch(LogIn({ identification, password }))
      .catch(({ data: { errors } }) => {
        setErrors(errors);
      });
  };

  if (user) return <Redirect to='/' />;
  else {
    return (
      <Form errors={errors} submit={submit}>
        <Input className='input identification' type='username' value={identification} onChange={updateIdentification} />
        <Input className='input password' type='password' value={password} onChange={updatePassword} />
        <button className='button login' type='submit'>
          Log In
        </button>
        <button type='button' className='button demo' onClick={() => prettyLogin(dispatch, LogIn)}>
          Demo User Login
        </button>
      </Form>
    );
  }
}
