import GlobalStyle from '../styles/GlobalStyle';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import wrapper from '../store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from '@tanstack/react-query';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    NProgress.configure({
      minimum: 0.1,
      showSpinner: false,
      trickleSpeed: 50,
    });

    const progressStart = () => {
      NProgress.start();
    };

    const progressDone = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', progressStart);
    router.events.on('routeChangeComplete', progressDone);
    router.events.on('routeChangeError', progressDone);

    return () => {
      router.events.off('routeChangeStart', progressStart);
      router.events.off('routeChangeComplete', progressDone);
      router.events.off('routeChangeError', progressDone);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
