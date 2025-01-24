import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (path: string) => {
    router.push(path); // ページ遷移
    setMenuOpen(false); // メニューを閉じる
  };

  return (
    <Box
      as="header"
      bg="#008080"
      /*背景色*/ color="white"
      py={5}
      /*上下のパディング*/ px={10} /*左右のパディング4px*10=40px*/
      position="relative"
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
        <Box position="relative">
          <IconButton
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            onClick={toggleMenu} // 開閉を切り替え
            color="white" // ハンバーガーメニューアイコンの色
            borderColor="white" // ボーダー色
            _hover={{ bg: "teal.600" }} // ホバー時の背景色
          />
          {isMenuOpen && (
            <>
              {/* 背景クリック用の透明ボックス */}
              <Box
                position="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                bg="transparent"
                zIndex="1"
                onClick={() => setMenuOpen(false)} // 背景クリックでメニューを閉じる
              />
              {/* カスタムメニューリスト */}
              <Box
                position="absolute"
                top="60px"
                right="10px"
                bg="white" // メニューリストの背景色を白に
                borderRadius="md"
                boxShadow="lg"
                zIndex="2"
                color="black" // メニュー項目の文字色を黒に
              >
                <Box
                  px={8}
                  py={2}
                  cursor="pointer"
                  borderRadius="md"
                  _hover={{ bg: "gray.100" }} // ホバー時の背景色を薄い灰色に
                  onClick={() => handleMenuClick("/questions")}
                >
                  Query
                </Box>
                <Box
                  px={4}
                  py={2}
                  cursor="pointer"
                  borderRadius="md"
                  _hover={{ bg: "gray.100" }} // ホバー時の背景色を薄い灰色に
                  onClick={() => handleMenuClick("/users")}
                >
                  User Page
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
