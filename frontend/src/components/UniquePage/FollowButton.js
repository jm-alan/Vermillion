import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import csrfetch from '../../store/csrf';

export default function FollowButton () {
  const location = useLocation();
  const whereAmI = location.pathname.toString();

  const [isFollowing, setFollowing] = useState(false);

  const follow = () => {
    csrfetch(`/api/users/${whereAmI}/followers`, {
      method: 'POST'
    })
      .then(resp => setFollowing(!!resp.data.result.match('follow')));
  };

  useEffect(() => {
    (async () => await csrfetch(`/api/users/me/isFollowing${whereAmI}`))()
      .then(resp => setFollowing(resp.data?.isFollowing ?? false));
  }, [whereAmI]);

  return (
    <button
      className='followButton'
      variant='contained'
      color={isFollowing ? 'secondary' : 'primary'}
      onClick={follow}
    >
      {`${isFollowing ? 'Unfollow' : 'Follow'}`}
    </button>
  );
}
