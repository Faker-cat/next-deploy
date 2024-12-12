import { Heading } from "@chakra-ui/react";

type WelcomeMessageProps = {
  name: string;
}

export function WelcomeMessage(props: WelcomeMessageProps) {
  return (
    <>
      <Heading fontSize="6xl" fontWeight="extrabold">
        {`Welcome to ${props.name}'s App !!`}
      </Heading>
    </>
  );
}