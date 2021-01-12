export default function Preview ({ contents: __html }) {
  return (
    <div className='previewContainer container'>
      <div id='preview' className='post' dangerouslySetInnerHTML={{ __html }} />
    </div>
  );
}
