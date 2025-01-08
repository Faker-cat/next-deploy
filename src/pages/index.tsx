import Head from "next/head";

import { Center, VStack } from "@chakra-ui/react";

import { LoginButton } from "@/components/Buttons/LoginButton";
import { ShowTableMessage } from "@/components/Messages/ShowTableMessage";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Faker's App`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
          <ShowTableMessage />
          <LoginButton />
        </VStack>
      </Center>
    </>
  );
}
