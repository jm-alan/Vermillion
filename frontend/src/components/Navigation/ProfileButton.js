import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { LogOut } from '../../store/session';

export default function ProfileButton ({ user }) {
  const dispatch = useDispatch();

  const [popped, togglePopped] = useState(false);

  const toggle = () => togglePopped(popped => !popped);
  const logout = () => dispatch(LogOut());

  return (
    <>
      <div
        className='profileButtonHolder profile'
        style={{ textAlign: 'right' }}
      >
        <i
          className='fas fa-user-circle'
          onClick={toggle}
        />
        <div
          style={{
            transition: 'all 0.4s',
            zIndex: 5,
            position: 'relative',
            right: '40px',
            top: popped ? '-45px' : '-100px'
          }}
        >
          <button
            className='button logout'
            onClick={logout}
          >Log Out
          </button>
        </div>
      </div>
    </>
  );
}
