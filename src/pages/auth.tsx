import { Center ,VStack} from "@chakra-ui/react";
import Head from "next/head";

import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { ShowTableMessage } from "@/components/Messages/ShowTableMessage";

import { LoginButton } from "@/components/Buttons/LoginButton";

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
        {/* <LoginButton/> */}
        {/* <UserTableButton/>
        <ItemTableButton/>  
        <LogoutButton />     */}
        </VStack>     
      </Center>
    </>
  );
}