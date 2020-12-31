import placeholders from './placeholders';

export default function BodyBox ({ RTEtext, updateRTEtext }) {
  return (
    <textarea
      id='postCreator'
      placeholder={`${placeholders[Math.round(Math.random() * 4)]}`}
      onChange={({ target: { value } }) => {
        updateRTEtext(() => value.toString());
      }}
      value={RTEtext}
    />
  );
}
