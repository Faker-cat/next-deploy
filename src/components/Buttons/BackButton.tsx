import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import supabase from "@/libs/supabase";

export function BackButton() {
  const router = useRouter();

  return (
    <>
      <Button
        w="50%"
        colorScheme="gray"
        onClick={() => {
          router.push("/auth");
        }}
      >
        Back
      </Button>
    </>
  );
}