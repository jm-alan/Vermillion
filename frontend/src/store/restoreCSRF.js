import csrfetch from './csrf';

export default function restoreCSRF () {
  return csrfetch('/api/csrf/restore');
}
