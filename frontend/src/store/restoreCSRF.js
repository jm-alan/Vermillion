import csrfetch from './csrf';
export default function () {
  return csrfetch('/api/csrf/restore');
}
