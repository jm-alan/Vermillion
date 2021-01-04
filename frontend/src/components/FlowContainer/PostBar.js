import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { FavPost } from '../../store/post';
import csrfetch from '../../store/csrf';

export default function PostBar ({ backendId, update }) {
  const dispatch = useDispatch();

  const [isHearted, setHearted] = useState(false);
  const favorite = () => {
    console.log('Favorite button clicked');
    dispatch(FavPost(backendId));
  };

  useEffect(() => {
    const getHearts = async () => {
      const data = (await csrfetch(`/api/users/hearts/${backendId}`)).data;
      if (data.isHearted) setHearted(isHearted);
    };
    getHearts();
  }, [update]);

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
