import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { LogOut } from '../../store/session';

export default function ProfileButton () {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ session: { user } }) => user);

  const [popped, togglePopped] = useState(false);

  const pop = () => togglePopped(true);
  const unPop = () => togglePopped(false);

  const logout = () => dispatch(LogOut());

  useEffect(() => {
    if (popped) {
      document.addEventListener('click', unPop);
      return () => document.removeEventListener('click', unPop);
    }
  });

  return (
    <>
      <div
        className='profileButtonHolder profile'
        style={{
          transition: 'all .4s ease-in-out',
          right: popped ? '-40px' : '10px',
          textAlign: 'right'
        }}
      >
        <AccountCircleIcon />
        <div
          id='userMenu'
          style={{
            right: popped ? '0px' : '-360px',
            transition: 'all 0.4s'
          }}
        >
          <button
            className='button logout'
            onClick={logout}
          >Log Out
          </button>
          <div className='lamb' />
          <button
            className='button'
            onClick={() => history.push(`/${user.username}`)}
          >
            My Blog
          </button>
          <div className='lamb' />
          <button
            className='button'
            onClick={() => history.push('/')}
          >
            Home
          </button>
          <div className='lamb' />
          <div className='lamb' />
          <div className='lamb' />
          <div className='lamb' />
          <div className='lamb' />
          <div className='lamb' />
        </div>
      </div>
    </>
  );
}
