import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import csrfetch from '../../store/csrf';

export default function BlogHeader ({ page }) {
  const [isFollowing, setFollowing] = useState(false);
  const location = useLocation();
  const whereAmI = location.pathname.toString();

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
    <div
      className='headerContainer'
    >
      <Button
        className='followButton'
        variant='contained'
        color={isFollowing ? 'secondary' : 'primary'}
        onClick={follow}
      >
        {`${isFollowing ? 'Unfollow' : 'Follow'}`}
      </Button>
      <div
        className='titleContainer'
      >
        <div className='blogTitle'>
          {`Welcome to ${page}'s blog!`}
        </div>
      </div>
    </div>
  );
}
