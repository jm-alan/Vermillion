import AppBar from '@material-ui/core/AppBar';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import ProfileButton from './ProfileButton';

export default function Navigation () {
  const user = useSelector(({ session: { user } }) => user);
  const location = useLocation();

  return (!user && location.pathname === '/')
    ? null
    : !user
        ? (
          <AppBar className='navBar' color='primary'>
            <div className='navHolder'>
              <NavLink to='/login' key='login'>
                <Button className='navbutton login' variant='contained'>
                  Log In
                </Button>
              </NavLink>
              <NavLink to='/signup' key='signup'>
                <Button className='navbutton signup' variant='contained'>
                  Sign Up
                </Button>
              </NavLink>
            </div>
          </AppBar>
          )
        : (
          <AppBar className='navBar'>
            <ProfileButton />
          </AppBar>
          );
}
