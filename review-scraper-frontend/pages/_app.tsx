import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from '@tanstack/react-query';
import GlobalStyle from '../styles/GlobalStyle';
import Header from '../components/common/Header';
import wrapper from '../store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
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
        <Provider store={store}>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
