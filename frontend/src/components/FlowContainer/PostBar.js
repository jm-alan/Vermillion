import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { TouchPost } from '../../store/post';

export default function PostBar ({ username, backendId, isHearted, createdAt, updatedAt }) {
  createdAt = new Date(createdAt);
  updatedAt = new Date(updatedAt);
  const dispatch = useDispatch();
  const [hearted, setHearted] = useState(isHearted);
  const [hoverMenu, popHoverMenu] = useState(false);
  const [mooring, setMooring] = useState(null);

  let hangTimer;

  const menuStart = ({ target }) => {
    hangTimer = setTimeout(() => {
      setMooring(target);
      popHoverMenu(true);
    }, 1000);
  };

  const menuClose = () => {
    popHoverMenu(false);
    setMooring(null);
  };

  const lowerMouseOut = () => {
    if (!hoverMenu && hangTimer) clearTimeout(hangTimer);
  };

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
          <h4
            onMouseEnter={menuStart}
            onMouseLeave={lowerMouseOut}
          >
            {username}
          </h4>
        </NavLink>
        <Menu
          id='follow-hover'
          anchorEl={mooring}
          keepMounted
          open={hoverMenu}
        >
          <MenuItem
            onClick={menuClose}
            onMouseLeave={menuClose}
          >
            Follow
          </MenuItem>
        </Menu>
        {' | '}
        <NavLink
          to={`/${backendId}`}
          className='timeStamp'
        >
          <h6
            style={{
              paddingTop: '3px'
            }}
          >
            {createdAt.toLocaleString({}, { dateStyle: 'short', timeStyle: 'short' }).replace(/,/, ' |')}
          </h6>
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
