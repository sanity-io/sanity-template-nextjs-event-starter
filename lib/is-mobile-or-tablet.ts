export default function isMobileOrTablet() {
  // https://stackoverflow.com/a/8876069/114157
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return viewportWidth < 1200;
}
