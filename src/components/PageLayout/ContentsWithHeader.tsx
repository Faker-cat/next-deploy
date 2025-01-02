import { Header } from "@/components/Header/Header";
import { Box, Flex } from "@chakra-ui/react";

type ContentsWithHeaderProps = {
  children: React.ReactNode;
};

export const ContentsWithHeader = ({ children }: ContentsWithHeaderProps) => {
  return (
    <>
      {/* Header を固定 */}
      <Box position="fixed" top="0" left="0" right="0" zIndex="1000">
        <Header />
      </Box>

      {/* 子コンテンツを表示 */}
      <Box
        as="main"
        pt="105px" // ヘッダーの高さに合わせた余白を設定
        px={4} // 左右のパディング
      >
        <Flex minH="100vh">{children}</Flex>
      </Box>
    </>
  );
};
