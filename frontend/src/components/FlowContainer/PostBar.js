import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { FavPost } from '../../store/post';

export default function PostBar ({ backendId }) {
  const dispatch = useDispatch();
  const runningPost = useSelector(({ post: { updatePost } }) => updatePost);
  const isThisPost = runningPost === backendId;

  const favorite = () => {
    console.log('Favorite button clicked');
    dispatch(FavPost(backendId));
  };

  useSelector(() => {}, [isThisPost]);

  return (
    <ButtonGroup
      variant='text'
      className='postButtons'
    >
      <Button onClick={favorite}>
        <FavoriteIcon className='heartButton' />
      </Button>
      <Button>
        <AutorenewIcon />
      </Button>
    </ButtonGroup>
  );
}
