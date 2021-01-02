import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';

export default function Navigation () {
  const user = useSelector(({ session: { user } }) => user);
  const location = useLocation();

  return (!user && location.pathname === '/')
    ? null
    : !user
        ? (
          <div className='navBar'>
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
          </div>
          )
        : (
          <div className='navBar'>
            <div className='lamb' />
            <ProfileButton />
          </div>
          );
}
