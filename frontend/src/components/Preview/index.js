export default function Preview ({ contents: __html }) {
  return (
    <div id='preview' dangerouslySetInnerHTML={{ __html }} />
  );
}
