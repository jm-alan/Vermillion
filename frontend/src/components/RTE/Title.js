export default function Title ({ title, updateTitle }) {
  return (
    <input
      className='title'
      type='text'
      placeholder='Title'
      value={title}
      onChange={({ target: { value } }) => updateTitle(value)}
    />
  );
}
