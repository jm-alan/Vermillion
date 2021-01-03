import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { LogOut } from '../../store/session';

export default function ProfileButton () {
  const dispatch = useDispatch();
  const history = useHistory();
  const [popped, togglePopped] = useState(false);

  const user = useSelector(({ session: { user } }) => user);
  const toggle = () => togglePopped(popped => !popped);

  const goBlog = () => {
    history.push(`/${user.username}`);
  };
  const goHome = () => {
    history.push('/');
  };
  const logout = () => {
    dispatch(LogOut());
  };

  return (
    <>
      <div
        className='profileButtonHolder profile'
        style={{
          textAlign: 'right'
        }}
      >
        <div
          id='userMenu'
          onClick={toggle}
          style={{
            alignItems: 'center',
            justifyItems: 'left',
            height: popped ? '90px' : '30px',
            width: popped ? '115px' : '30px',
            marginLeft: 'auto',
            marginRight: '5px',
            borderRadius: '4px',
            gridTemplateRows: 'repeat(4, 1fr)',
            overflow: 'hidden'
          }}
        >
          <AccountCircleIcon id='navProfile' />
          <Button
            variant='contained'
            className={`${popped ? 'popped' : 'unpopped'}`}
            disabled={!popped}
            onClick={goHome}
          >
            Home
          </Button>
          <Button
            variant='contained'
            className={`${popped ? 'popped' : 'unpopped'}`}
            disabled={!popped}
            onClick={goBlog}
          >
            My Blog
          </Button>
          <Button
            variant='contained'
            className={`${popped ? 'popped' : 'unpopped'}`}
            disabled={!popped}
            onClick={logout}
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
