import NProgress from 'nprogress';
import Router from 'next/router';

let timeout;

const start = () => {
  timeout = setTimeout(NProgress.start, 100);
};

const done = () => {
  clearTimeout(timeout);
  NProgress.done();
};

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', done);
Router.events.on('routeChangeError', done);

export default function Progress() {
  return (
    <style jsx global>
      {`
        /* Make clicks pass-through */
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: linear-gradient(
            90deg,
            #ec6192 4.44%,
            #ec4c34 21.45%,
            #ffbd2b 37.21%,
            #ebde56 54.63%,
            #57c754 70.8%,
            #53a1eb 84.07%,
            #ec6192 100%
          );
          animation: 5s linear infinite gradient-rotation;
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }

        @keyframes gradient-rotation {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100vw 0;
          }
        }
      `}
    </style>
  );
}
