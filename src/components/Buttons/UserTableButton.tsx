import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import supabase from "@/libs/supabase";

export function UserTableButton() {
  const router = useRouter();

  return (
    <>
      <Button
        w="100%"
        colorScheme="blue"
        onClick={() => {
          router.push("/users");
        }}
      >
        users
      </Button>
    </>
  );
}