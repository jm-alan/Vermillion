import FollowButton from './FollowButton';

export default function BlogHeader ({ page }) {
  return (
    <div
      className='headerContainer'
    >
      <div
        className='titleContainer'
      >
        <div className='blogTitle'>
          {`Welcome to ${page}'s blog!`}
        </div>
        <FollowButton />
      </div>
    </div>
  );
}
