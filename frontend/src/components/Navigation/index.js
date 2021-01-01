import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../store/session';

import ProfileButton from './ProfileButton';

export default function Navigation ({ user }) {
  const dispatch = useDispatch();
  const logout = () => dispatch(LogOut());

  return !user
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
        <div className='navHolder'>
          <NavLink exact to='/'>
            <button className='navbutton home'>
              Home
            </button>
          </NavLink>
        </div>
        <ProfileButton user={user} />
      </div>
      );
}
