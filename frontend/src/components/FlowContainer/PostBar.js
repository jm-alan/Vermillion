import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { FavPost, EnumerateFavs } from '../../store/post';

export default function PostBar ({ backendId }) {
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
    <ButtonGroup
      variant='text'
      className='postButtons'
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
  );
}
