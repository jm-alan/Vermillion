import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from '../../store/session';

import ProfileButton from './ProfileButton';

export default function Navigation () {
  const user = useSelector(({ session: { user } }) => user);
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
                    <button>
                      Log In
                    </button>
                  </NavLink>
                  <NavLink to='/signup' key='signup'>
                    <button>
                      Sign Up
                    </button>
                  </NavLink>
                </div>
                )
              : (
                <div className='navHolder'>
                  <NavLink to='/'>
                    <button>
                      Home
                    </button>
                  </NavLink>
                  <button
                    onClick={logout}
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
