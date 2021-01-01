export default function Post ({ content }) {
  return (
    <div className='post card'>
      <div className='postTitle'>{content.title}</div>
      <hr />
      <div className='postBody'>{content.body}</div>
    </div>
  );
}
