export default function Error ({ errors }) {
  return (
    <div
      className='errors'
      style={{
        visibility: errors.length ? 'visible' : 'hidden',
        height: errors.length ? '10%' : 0,
        overflow: 'hidden'
      }}
    >
      <ul className='errorList'>
        {errors.map((err, idx) => <li key={idx}>{err}</li>)}
      </ul>
    </div>
  );
}
