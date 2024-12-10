import { Center ,VStack } from "@chakra-ui/react";
import Head from "next/head";

import UsersTable from "../components/UserTable/UsersTable";
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
        <UsersTable />
        <BackButton />
        </VStack>
      </Center>
    </>
  );
}