import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { Center, VStack } from "@chakra-ui/react";

import { LoginButton } from "@/components/Buttons/LoginButton";
import { WelcomeMessage } from "@/components/Messages/WelcomeMessage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Faker's App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="100vh">
        <VStack>
          <WelcomeMessage/>
          <LoginButton />
        </VStack>
      </Center>
    </>
  );
}
