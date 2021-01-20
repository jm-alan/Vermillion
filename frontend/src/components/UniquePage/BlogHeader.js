export default function BlogHeader ({ page }) {
  return (
    <div className='headerContainer'>
      <div className='blogTitle'>
        {`Welcome to ${page}'s blog!`}
      </div>
    </div>
  );
}
