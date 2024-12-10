import { Center ,VStack} from "@chakra-ui/react";
import Head from "next/head";

//import UsersTable from "../components/UserTable/UsersTable";
import { ItemTableButton } from "@/components/Buttons/ItemTableButton";
import { UserTableButton } from "@/components/Buttons/UserTableButton";
import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { ShowTableMessage } from "@/components/Messages/ShowTableMessage";

import { LoginButton } from "@/components/Buttons/LoginButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>auth</title>
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