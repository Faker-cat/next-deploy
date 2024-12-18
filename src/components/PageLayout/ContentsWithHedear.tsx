import { Header } from "@/components/Header/Header";
import { Box, Flex } from "@chakra-ui/react";

type ContentsWithHedearProps = {
  children: React.ReactNode;
};

export const ContentsWithHedear = ({ children }: ContentsWithHedearProps) => {
    return (
        <>
            <Header />
            <Box as="main" pt={5}/*header用に上部のパディング*/ px={4}/*左右のパディング*/>
                <Flex minH="100vh"> {/* 64pxはヘッダーの高さを仮定 */}
                    { children}
                </Flex>
            </Box>
        </>
        
    )
};