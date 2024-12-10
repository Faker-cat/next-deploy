import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import supabase from "@/libs/supabase";

export function ItemTableButton() {
  const router = useRouter();

  return (
    <>
      <Button
        w="100%"
        colorScheme="yellow"
        onClick={() => {
          router.push("/items");
        }}
      >
        items
      </Button>
    </>
  );
}