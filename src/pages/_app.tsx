import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return <QueryClientProvider client={queryClient}>{getLayout(<Component {...pageProps} />)}</QueryClientProvider>
}
