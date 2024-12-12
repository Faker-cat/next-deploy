import { QuestionCard } from "@/components/Card/QuestionCard";
import { ContentsWithHedear } from "@/components/PageLayout/ContentsWithHedear";
import { Box, GridItem, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // サンプルデータ
  const a = [
    {
      id: 1,
      user_name: "Faker",
      title: "EXAMPLE",
      content:
        "This is an example question. It's a very long content to test the truncation feature. The content should now have more than 160 characters to properly test the truncation logic. This additional sentence ensures the total character count exceeds 161.",
      user_id: 1,
      is_anonymous: true,
      created_ad: "2024-12-11",
    },
    {
      id: 2,
      user_name: "Jane Doe",
      title: "Another Question",
      content: "Here's another example question with a moderate length content.",
      user_id: 2,
      is_anonymous: false,
      created_ad: "2024-12-10",
    },
    {
      id: 3,
      user_name: "John Smith",
      title: "Yet Another Question",
      content: "Short content.",
      user_id: 3,
      is_anonymous: false,
      created_ad: "2024-12-09",
    },
  ];

  return (
    <>
      <Head>
        <title>Query</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentsWithHedear>
        <SimpleGrid columns={10} gap={4} height="100vh" width="100%" px={4}>
          {/* 左側: 8カラム */}
          <GridItem colSpan={8}>
            <Box height="100%" bg="#C3DBE8" p={4}>
              <Wrap spacing="16px" justify="flex-start">
                {a.map((e) => (
                  <WrapItem
                    key={e.id}
                    flexBasis={{ base: "100%", md: "calc(50% - 16px)" }} // 横に2つ並べる設定
                  >
                    <Box
                      w="100%"
                      h="200px" // カード全体の高さを固定
                      bg="red.200"
                      cursor="pointer"
                      borderRadius="md"
                      boxShadow="md"
                      onClick={() => router.push("/question_details"/*`/questions/${e.id}`*/)}
                      _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
                      transition="0.2s ease"
                    >
                      <QuestionCard
                        id={e.id}
                        user_name={e.user_name}
                        title={e.title}
                        content={e.content}
                        user_id={e.user_id}
                        is_anonymous={e.is_anonymous}
                        created_ad={e.created_ad}
                      />
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </GridItem>

          {/* 右側: 2カラム */}
          <GridItem colSpan={2}>
            <Box
              height="100%"
              bg="green.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
            >
              {/* 右側のコンテンツがここに入る */}
            </Box>
          </GridItem>
        </SimpleGrid>
      </ContentsWithHedear>
    </>
  );
}
