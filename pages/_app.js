import { SSRProvider, OverlayProvider } from 'react-aria';
// import NProgress from '../components/nprogress';
import viewportPolyfill from '../components/viewport-height';

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <OverlayProvider>
        <Component {...pageProps} />
        {/* <NProgress /> */}
      </OverlayProvider>
    </SSRProvider>
  );
}
