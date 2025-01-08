import supabase from "@/libs/supabase";
import {
  Button,
  Flex,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export function LoginButton() {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("white", "gray.700");
  const formShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Flex
      direction="column"
      p={8}
      rounded="lg"
      bg={formBackground}
      shadow={formShadow}
      alignItems="center"
      w="full"
    >
      <VStack spacing={4} w="full">
        <Button
          w="full"
          colorScheme="blue"
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: "/callback" },
            })
          }
        >
          Continue with Google
        </Button>
        <Button
          w="full"
          colorScheme="purple"
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "github",
              options: { redirectTo: "/callback" },
            })
          }
        >
          Continue with GitHub
        </Button>
        <Button w="full" onClick={toggleColorMode}>
          Toggle Color Mode
        </Button>
      </VStack>
    </Flex>
  );
}
