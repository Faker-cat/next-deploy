import { QuestionCard } from "@/components/Card/QuestionCard";
import { ContentsWithHedear } from "@/components/PageLayout/ContentsWithHedear";
import { Box, GridItem, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

// Questionデータの型定義
type Question = {
  id: number;
  user_name: string;
  title: string;
  content: string;
  user_id: number;
  is_anonymous: boolean;
  created_ad: string;
  likes: number;
  bookmarks: number;
  isLiked: boolean; // いいね状態
  isBookmarked: boolean; // ブックマーク状態
};

export default function Home() {
  const router = useRouter();

  // サンプルデータ
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      user_name: "Faker",
      title: "EXAMPLE",
      content:
        "この文章は、指定された文字数を超えるために作成された例文です。文章の長さが百字を超えるように調整し、内容としては何かしらの意味が通るようにしています。まだ百字じゃないの？まだ？あいうえお",
      user_id: 1,
      is_anonymous: true,
      created_ad: "2024-12-11",
      likes: 10,
      bookmarks: 5,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 2,
      user_name: "davis",
      title: "Another Question",
      content: "Here's another example question with a moderate length content.",
      user_id: 2,
      is_anonymous: false,
      created_ad: "2024-12-10",
      likes: 3,
      bookmarks: 2,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: 3,
      user_name: "eto",
      title: "Yet Another Question",
      content: "Short content.",
      user_id: 3,
      is_anonymous: false,
      created_ad: "2024-12-09",
      likes: 0,
      bookmarks: 1,
      isLiked: false,
      isBookmarked: false,
    },
  ]);

  // いいねの切り替え処理
  const toggleLike = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, likes: q.isLiked ? q.likes - 1 : q.likes + 1, isLiked: !q.isLiked }
          : q
      )
    );
  };

  // ブックマークの切り替え処理
  const toggleBookmark = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              bookmarks: q.isBookmarked ? q.bookmarks - 1 : q.bookmarks + 1,
              isBookmarked: !q.isBookmarked,
            }
          : q
      )
    );
  };

  // 質問の詳細ページへ遷移する関数
  const viewDetails = (id: number) => {
    router.push(`/question_details?id=${id}`);
  };

  return (
    <>
      <Head>
        <title>Query</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentsWithHedear>
        <SimpleGrid columns={10} gap={4} height="100vh" width="100%" px={4}>
          <GridItem colSpan={8}>
            <Box height="100%" bg="#C3DBE8" p={4}>
              <Wrap spacing="16px" justify="flex-start">
                {questions.map((e) => (
                  <WrapItem
                    key={e.id}
                    flexBasis={{ base: "100%", md: "calc(50% - 16px)" }}
                  >
                    <Box
                      w="100%"
                      h="200px"
                      cursor="pointer"
                      borderRadius="md"
                      boxShadow="md"
                      _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
                      transition="0.2s ease"
                    >
                      <QuestionCard
                        id={e.id}
                        user_name={e.user_name}
                        title={e.title}
                        content={e.content}
                        is_anonymous={e.is_anonymous}
                        created_ad={e.created_ad}
                        likes={e.likes}
                        bookmarks={e.bookmarks}
                        isLiked={e.isLiked} // 状態を渡す
                        isBookmarked={e.isBookmarked} // 状態を渡す
                        onToggleLike={(event) => {
                          event.stopPropagation(); // イベントの伝播を停止
                          toggleLike(e.id); // idを渡す
                        }} // イベントハンドラを渡す
                        onToggleBookmark={(event) => {
                          event.stopPropagation(); // イベントの伝播を停止
                          toggleBookmark(e.id); // idを渡す
                        }} // イベントハンドラを渡す
                        onClick={() => viewDetails(e.id)} // 詳細ページ遷移のハンドラを渡す
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
              ここに追加コンテンツ
            </Box>
          </GridItem>
        </SimpleGrid>
      </ContentsWithHedear>
    </>
  );
}

