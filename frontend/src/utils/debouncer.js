import sanitize from 'sanitize-html';
import markup from 'marked';

const sanitizeOptions = {
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    img: ['src', 'alt']
  },
  allowedTags: [...sanitize.defaults.allowedTags, 'img']
};

export default function debounceCreator () {
  let timer;
  return (value, updater) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('Timer successfully finished');
      updater(() => sanitize(markup(value.toString()), sanitizeOptions));
    }, 500);
  };
}
