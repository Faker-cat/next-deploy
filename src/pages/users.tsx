import { Center, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { BackButton } from "@/components/Buttons/BackButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <VStack>
        <BackButton />
        </VStack>
      </Center>
    </>
  );
}