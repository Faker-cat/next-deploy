import Head from "next/head";

import { BackButton } from "@/components/Buttons/BackButton";
import { ShowTableMessage } from "@/components/Messages/ShowTableMessage";
import { Center, VStack } from "@chakra-ui/react";

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
          <BackButton/>
        </VStack>
      </Center>
    </>
  );
}
