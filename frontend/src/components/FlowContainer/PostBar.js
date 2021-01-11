import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { TouchPost } from '../../store/post';

export default function PostBar ({ username, backendId, isHearted, createdAt, updatedAt }) {
  createdAt = new Date(createdAt);
  updatedAt = new Date(updatedAt);
  const dispatch = useDispatch();
  const [hearted, setHearted] = useState(isHearted);

  const heart = () => {
    dispatch(TouchPost(backendId, 'like'))
      .then(res => {
        switch (res) {
          case 'like':
            setHearted(true);
            break;
          case 'unlike':
            setHearted(false);
            break;
          default:
            setHearted(false);
        }
      });
  };

  return (
    <div
      className='postButtons'
    >
      <div className='identContainer'>
        <NavLink to={`/${username}`}>
          <h4>
            {username}
          </h4>
        </NavLink>
        {' | '}
        <NavLink
          to={`/${backendId}`}
          className='timeStamp'
        >
          <h6>
            Posted: {createdAt.toLocaleString({}, { dateStyle: 'short', timeStyle: 'short' }).replace(/,/, ' |')}
          </h6>
          {/* {createdAt.toString() === updatedAt.toString()
            ? null
            : (
              <h6>
                Last edited: {updatedAt.toLocaleString({}, { dateStyle: 'short', timeStyle: 'short' }).replace(/,/, ' |')}
              </h6>)} */}
        </NavLink>
      </div>
      <ButtonGroup
        variant='text'
      >
        <Button
          className='heartButton'
          onClick={heart}
        >
          <FavoriteIcon
            className={`heartIcon ${hearted ? 'hearted' : 'unhearted'}`}
          />
        </Button>
        <Button
          className='reblogButton'
        >
          <AutorenewIcon
            className='reblogIcon'
          />
        </Button>
      </ButtonGroup>
    </div>
  );
}
