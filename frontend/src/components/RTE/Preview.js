export default function Preview ({ contents: __html }) {
  return (
    <div className='previewContainer container'>
      <div id='preview' dangerouslySetInnerHTML={{ __html }} />
    </div>
  );
}
