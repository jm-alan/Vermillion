import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../store/session';

import ProfileButton from './ProfileButton';

export default function Navigation ({ user }) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(LogOut());
  };

  return (
    <div className='navBar'>
      {
        [
          (
            !user
              ? (
                <div className='navHolder'>
                  <NavLink to='/login' key='login'>
                    <button className='navbutton login'>
                      Log In
                    </button>
                  </NavLink>
                  <NavLink to='/signup' key='signup'>
                    <button className='navbutton signup'>
                      Sign Up
                    </button>
                  </NavLink>
                </div>
                )
              : (
                <div className='navHolder'>
                  <NavLink to='/'>
                    <button className='navbutton home'>
                      Home
                    </button>
                  </NavLink>
                  <button
                    onClick={logout}
                    className='navbutton logout'
                  >
                    Log Out
                  </button>
                </div>
                )
          ),
          (
            <ProfileButton key='profile' />
          )
        ]
      }
    </div>
  );
}
