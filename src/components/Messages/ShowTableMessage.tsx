import { Heading, Text } from "@chakra-ui/react";

export function ShowTableMessage() {
  return (
    <>
      <Heading
        fontSize={{ base: "3xl", md: "5xl" }}
        fontWeight="extrabold"
        mb={4}
        bgClip="text"
        bgGradient="linear(to-r, teal.200, blue.400)"
      >
        Welcome to Query!
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} opacity={0.8}>
        Your go-to platform for sharing and solving questions.
      </Text>
    </>
  );
}
