export default function Title ({ title, updateTitle }) {
  return (
    <input
      className='title'
      type='text'
      maxLength={100}
      placeholder='Title'
      value={title}
      onChange={({ target: { value } }) => updateTitle(value)}
    />
  );
}
