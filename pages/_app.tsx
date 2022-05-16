import type { AppProps } from 'next/app'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </JotaiProvider>
  )
}

export default App
