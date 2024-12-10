import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "../SessionProvider/SessionProvider";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <RecoilRoot>
      <SessionProvider>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </RecoilRoot>
    
  )
}

