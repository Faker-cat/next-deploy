import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box
      as="header"
      bg="#008080"
      /*背景色*/ color="white"
      py={5}
      /*上下のパディング*/ px={10} /*左右のパディング4px*10=40px*/
    >
      <Flex justify="space-between" align="center">
        {/* アプリ名 */}
        <Text
          fontSize="4xl"
          fontWeight="light"
          letterSpacing="wide"
          fontFamily="Arial"
        >
          Query
        </Text>

        {/* ハンバーガーメニュー */}
        <Menu isOpen={isOpen}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={isOpen ? onClose : onOpen}
          />
          <MenuList color="black">
            <MenuItem onClick={() => router.push("/auth")}>Query</MenuItem>
            <MenuItem onClick={() => router.push("/user")}>user page</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
