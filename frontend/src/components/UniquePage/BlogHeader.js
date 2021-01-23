import { useState } from 'react';

export default function BlogHeader ({ page }) {
  const [isFollowing, setFollowing] = useState(false);

  
  return (
    <div className='headerContainer'>
      <div className='blogTitle'>
        {`Welcome to ${page}'s blog!`}
      </div>
    </div>
  );
}
