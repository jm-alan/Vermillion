import Cookies from 'js-cookie';

const csrfetch = async (url, options = {}) => {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  const res = await window.fetch(url, options);

  const contentType = res.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    res.data = await res.json();
  }

  if (res.status >= 400) throw res;

  return res;
};

export default csrfetch;
