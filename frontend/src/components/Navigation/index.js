import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';

export default function Navigation () {
  const user = useSelector(({ session: { user } }) => user);

  return (
    <div className='navBar'>
      {
        [
          (
            !user
              ? (
                <div className='navHolder'>
                  <NavLink to='/login'>
                    <button>
                      Log In
                    </button>
                  </NavLink>
                  <NavLink to='/signup'>
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
