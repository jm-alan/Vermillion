import { NavLink } from 'react-router-dom';

export default function AnonHomePage () {
  return (
    <div className='anonNavHolder'>
      <div className='anonTitle'>
        <span
          className='anonHomeSpan'
          title='Yes this is comic sans on purpose, @ me'
        >Vermillion
        </span>
        <h1>
          Welcome to your new favorite place to get lost for an hour or three.
        </h1>
        <h1>
          If you'd like to check out the content shared by our fantastic creators, please either
        </h1>
      </div>
      <div className='innerAnonHolder'>
        <NavLink to='/login'>
          <button className='anonbutton'>
            Log In
          </button>
        </NavLink>
        <div>
          <h1>or</h1>
        </div>
        <NavLink to='/signup'>
          <button className='anonbutton'>
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
}
