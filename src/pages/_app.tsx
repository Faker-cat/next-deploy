import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "../SessionProvider/SessionProvider";

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}
