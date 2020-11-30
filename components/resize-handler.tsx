import { useEffect } from 'react';

function calcVh() {
  document.documentElement.style.setProperty('--100vh', window.innerHeight + 'px');
}

/**
 * Fix iOS 100vh bug (Unlike PostCSS-based solutions,
 * this JS-based solution allows var(--100vh) to be used inside calc())
 */
export default function ResizeHandler() {
  useEffect(() => {
    window.addEventListener('resize', calcVh);
    calcVh();
    return () => {
      window.removeEventListener('resize', calcVh);
    };
  }, []);
  return <></>;
}
