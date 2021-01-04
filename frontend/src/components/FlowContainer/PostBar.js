import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { NavLink } from 'react-router-dom';

import { FavPost, EnumerateFavs } from '../../store/post';

export default function PostBar ({ backendId, username }) {
  const dispatch = useDispatch();
  const heartList = useSelector(({ post: { hearts } }) => hearts);
  const update = useSelector(({ post: { update } }) => update);

  const [isHearted, setHearted] = useState(false);
  const favorite = () => {
    dispatch(FavPost(backendId));
    dispatch(EnumerateFavs());
  };

  useEffect(() => {
    if (heartList) {
      heartList.forEach(heart => {
        if (heart.postId === backendId) setHearted(true);
      });
    }
  }, [heartList, backendId, update]);

  useEffect(() => {
    dispatch(EnumerateFavs());
  }, [update, isHearted]);

  return (
    <div
      className='postButtons'
    >
      <NavLink to={`/${username}`}><h4>{username}</h4></NavLink>
      <ButtonGroup
        variant='text'
      >
        <Button onClick={favorite}>
          <FavoriteIcon
            className='heartButton'
            style={{
              color: isHearted ? 'red' : 'unset'
            }}
          />
        </Button>
        <Button>
          <AutorenewIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
