import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

import { ChakraProvider } from "@chakra-ui/react"

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider, ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";

function getLibrary(provider: JsonRpcFetchFunc | ExternalProvider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App({ Component, pageProps }: AppProps) {
    return (
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </ChakraProvider>
    )
  }
  export default App
