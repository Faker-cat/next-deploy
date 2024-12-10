import { Center, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { ShowTableMessage } from "@/components/Messages/ShowTableMessage";


export default function Home() {
  return (
    <>
      <Head>
        <title>Query</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
        <ShowTableMessage/>
        <LogoutButton />    
        </VStack>     
      </Center>
    </>
  );
}