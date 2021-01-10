import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { NavLink } from 'react-router-dom';

export default function PostBar ({ username }) {
  return (
    <div
      className='postButtons'
    >
      <NavLink to={`/${username}`}><h4>{username}</h4></NavLink>
      <ButtonGroup
        variant='text'
      >
        <Button>
          <FavoriteIcon
            className='heartButton'
          />
        </Button>
        <Button>
          <AutorenewIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
