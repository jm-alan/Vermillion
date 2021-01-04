export default function Input ({ className, value, onChange, type }) {
  return (
    <input
      className={className}
      type={type === 'Username' ? 'text' : type === 'confirm password' ? 'password' : type}
      placeholder={type === 'email' ? 'email@website.com' : type}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      required
    />
  );
}
