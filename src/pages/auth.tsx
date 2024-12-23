import { QuestionCard } from "@/components/Card/QuestionCard";
import { ContentsWithHeader } from "@/components/PageLayout/ContentsWithHeader";
import {
  Box,
  Button,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  tags: string[];
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
      tags: ["JavaScript", "React", "Frontend"], // タグを追加
    },
    {
      id: 2,
      user_name: "davis",
      title: "Another Question",
      content:
        "Here's another example question with a moderate length content.",
      user_id: 2,
      is_anonymous: false,
      created_ad: "2024-12-10",
      likes: 3,
      bookmarks: 2,
      isLiked: false,
      isBookmarked: false,
      tags: ["Backend", "Node.js"], // タグを追加
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
      tags: ["Backend", "UI/UX"], // タグを追加
    },
  ]);

  // 検索状態管理
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredQuestions, setFilteredQuestions] =
    useState<Question[]>(questions);

  const recommendedTags = [
    "JavaScript",
    "趣味",
    "健康",
    "習慣",
    "研究",
    "勉強",
  ];

  // 検索処理
  useEffect(() => {
    if (searchKeyword === "") {
      setFilteredQuestions(questions); // 検索ワードが空なら全て表示
    } else {
      setFilteredQuestions(
        questions.filter(
          (q) =>
            q.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            q.user_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            q.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            q.tags.some((tag) =>
              tag.toLowerCase().includes(searchKeyword.toLowerCase())
            )
        )
      );
    }
  }, [searchKeyword, questions]);

  // 検索キーワードのリセット
  const resetSearch = () => {
    setSearchKeyword("");
  };

  // タグクリックで検索
  const handleTagClick = (tag: string) => {
    setSearchKeyword(tag);
  };

  // いいねの切り替え処理
  const toggleLike = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              likes: q.isLiked ? q.likes - 1 : q.likes + 1,
              isLiked: !q.isLiked,
            }
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
      <ContentsWithHeader>
        <SimpleGrid
          columns={10}
          gap={4}
          height="100vh"
          width="100%"
          px={4}
          bg="white"
        >
          {/* 左側 */}
          <GridItem colSpan={{ base: 10, md: 8 }}>
            <Box
              height="100%"
              bg="#253045"
              p={4}
              boxShadow="md"
              borderRadius="md"
            >
              {filteredQuestions.length > 0 ? (
                <Wrap spacing="16px" justify="flex-start">
                  {filteredQuestions.map((e) => (
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
                          isLiked={e.isLiked}
                          isBookmarked={e.isBookmarked}
                          tags={e.tags}
                          onClick={() => viewDetails(e.id)}
                          onToggleLike={() => toggleLike(e.id)}
                          onToggleBookmark={() => toggleBookmark(e.id)}
                        />
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%" // 高さを全体に設定
                >
                  <Text color="gray.500" textAlign="center" fontSize="lg">
                    検索結果が見つかりません。
                  </Text>
                </Box>
              )}
            </Box>
          </GridItem>

          {/* 右側 */}
          <GridItem colSpan={{ base: 10, md: 2 }}>
            <Box
              height="100%"
              bg="#191e2b"
              p={4}
              boxShadow="md"
              borderRadius="md"
            >
              {/* 検索バー */}
              <InputGroup mb={4}>
                <Input
                  placeholder="検索キーワードを入力..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    height="2rem" // ボタンの高さを調整
                    minWidth="2rem" // ボタンの幅を調整
                    bg="transparent" // 背景を透明に
                    color="gray.500" // 色を入力欄に合わせる
                    fontSize="1.2rem" // 文字サイズを調整
                    _hover={{ bg: "transparent", color: "gray.700" }} // ホバー時の色
                    _active={{ bg: "transparent", color: "gray.900" }} // クリック時の色
                    onClick={resetSearch}
                  >
                    ×
                  </Button>
                </InputRightElement>
              </InputGroup>

              {/* おすすめタグ */}
              <Box>
                <Wrap spacing="8px">
                  {recommendedTags.map((tag) => (
                    <Tag
                      key={tag}
                      size="md"
                      variant="solid"
                      colorScheme="gray"
                      cursor="pointer"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </Wrap>
              </Box>
            </Box>
          </GridItem>
        </SimpleGrid>
      </ContentsWithHeader>
    </>
  );
}
