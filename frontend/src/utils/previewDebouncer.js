import sanitize from 'sanitize-html';
import markup from 'marked';

const sanitizeOptions = {
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    img: ['src', 'alt']
  },
  allowedTags: [...sanitize.defaults.allowedTags, 'img']
};

export default function debouncer () {
  let interval;
  return (value, updater) => {
    if (interval) clearTimeout(interval);
    interval = setTimeout(() => {
      updater(() => sanitize(markup(value.toString()), sanitizeOptions));
    }, 500);
  };
}
