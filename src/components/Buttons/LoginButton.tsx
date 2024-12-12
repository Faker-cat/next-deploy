import { Button } from "@chakra-ui/react";

import supabase from "@/libs/supabase";


import { Flex, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react';

export function LoginButton() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  

  async function GetSession() {

    const{data,/*error*/} = await supabase.auth.getSession()
    console.log(data)

  }

  const { toggleColorMode } = useColorMode();
  const formBackGround = useColorModeValue("gray.100", "gray.700");

  return (
    <>
    
    <Flex height="50vh" alignItems="center" justifyContent="center">
    <Flex direction="column" background={formBackGround} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Button colorScheme="blue"  variant='outline' as="a" onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}>
          Google
        </Button>
        <Button colorScheme="purple"  variant='outline' as="a" onClick={() => supabase.auth.signInWithOAuth({ provider: "github" })}>
          GitHub
        </Button>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>  
  
    
    </>
  );
}