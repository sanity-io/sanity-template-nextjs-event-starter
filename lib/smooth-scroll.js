import smoothscroll from 'smoothscroll-polyfill';

let installed = false;

export default function scroll(opts) {
  if (!installed) {
    try {
      smoothscroll.polyfill();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('smoothscroll polyfill failed', err);
      return;
    }
    installed = true;
  }

  try {
    window.scroll({ behavior: 'smooth', ...opts });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('smoothscroll polyfill failed', err);
  }
}

export const scrollTo = (el, offset = 0) => {
  scroll({
    top: el.offsetTop + offset
  });
};
