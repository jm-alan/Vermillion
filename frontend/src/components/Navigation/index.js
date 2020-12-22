import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LogOut } from '../../store/session';

export default function Navigation () {
  const user = useSelector(({ session: { user } }) => user);
  if (user) {
    return (
      <nav>
        <h1>{user.name} is logged in!</h1>
        <button
          style={{
            maxWidth: '500px'
          }}
        >Log Out
        </button>
      </nav>
    );
  } else {
    return (
      <nav>
        <button>Log In</button>
        <button>Sign Up</button>
      </nav>
    )
    ;
  }
}
