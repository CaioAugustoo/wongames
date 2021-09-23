import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'utils/apollo'

import { Provider as AuthProvider } from 'next-auth/client'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { CartProvider } from 'hooks/useCart'

import { ThemeProvider } from 'styled-components'

import NextNprogress from 'nextjs-progressbar'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState)

  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <Head>
              <title>Won Games</title>
              <link rel="shortcut icon" href="/img/icon-512.png" />
              <link rel="apple-touch-icon" href="/img/icon-512.png" />
              <link rel="manifest" href="/manifest.json" />
              <meta
                name="description"
                content="The best Game Store in the world!"
              />
            </Head>
            <GlobalStyles />
            <NextNprogress
              color="#47C8FF"
              startPosition={0.3}
              stopDelayMs={0}
              height={5}
              showOnShallow={true}
              options={{ easing: 'ease', speed: 500 }}
            />
            <Component {...pageProps} />
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
