import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function ProfileButton () {
  const user = useSelector(({ session: { user } }) => user);

  if (user) {
    return (
      <NavLink to={`/${user.username}`}>
        <div className='profileButtonHolder profile'>
          <i className='fas fa-user-circle' />
        </div>
      </NavLink>
    );
  } else return null;
}
