import { Center, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { BackButton } from "@/components/Buttons/BackButton";
import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { Header } from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Center>
        <VStack>
          <BackButton />
          <LogoutButton />
        </VStack>
      </Center>
    </>
  );
}