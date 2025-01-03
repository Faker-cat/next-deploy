import { QuestionCard } from "@/components/Card/QuestionCard";
import { QuestionPostModal } from "@/components/Modal/QuestionPostModal";
import { ContentsWithHeader } from "@/components/PageLayout/ContentsWithHeader";
import { Question } from "@/types/question";
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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useDisclosure();

  const [questions, setQuestions] = useState<Question[]>([]);

  async function handleGet() {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + "/questions";
      const res = await axios.get(url);
      if (res.status !== 200) {
        throw new Error("Failed to fetch questions");
      }
      setQuestions(res.data as Question[]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const init = async () => {
      await handleGet();
    };
    init();
  }, []);

  // 検索状態管理
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredQuestions, setFilteredQuestions] =
    useState<Question[]>(questions);

  const [activeTags, setActiveTags] = useState<string[]>([]); // 現在選択されたタグ

  const recommendedTags = [
    "JavaScript",
    "Backend",
    "健康",
    "習慣",
    "研究",
    "勉強",
  ];

  // タグクリックで検索
  const handleTagClick = (tag: string) => {
    // タグがまだ選択されていない場合はactiveTagsに追加
    setActiveTags((prevTags) => {
      if (!prevTags.includes(tag)) {
        return [...prevTags, tag]; // タグを追加
      }
      return prevTags; // 既に追加されていれば何もしない
    });

    // 検索キーワードにタグを追加して検索
    setSearchKeyword((prevKeyword) => {
      const newKeyword = prevKeyword.trim();
      if (!newKeyword.includes(tag)) {
        return newKeyword + " " + tag;
      }
      return prevKeyword; // すでにタグが含まれていればそのまま
    });
  };

  // 検索処理のuseEffect
  useEffect(() => {
    // 検索キーワードを半角・全角空白で分割
    const keywords = searchKeyword
      .toLowerCase()
      .split(/\s+/) // 正規表現で空白（半角・全角）を区切り文字として扱う
      .filter((k) => k.trim() !== ""); // 空の文字列を除外

    if (keywords.length === 0 && activeTags.length === 0) {
      setFilteredQuestions(questions); // 検索ワードとタグが空なら全て表示
    } else {
      setFilteredQuestions(
        questions.filter((q) =>
          keywords.every(
            (keyword) =>
              q.title.toLowerCase().includes(keyword) ||
              q.user_name.toLowerCase().includes(keyword) ||
              q.content.toLowerCase().includes(keyword) ||
              q.tags.some((tag) => tag.toLowerCase().includes(keyword))
          )
        )
      );
    }
  }, [searchKeyword, activeTags, questions]); // activeTagsを依存配列に追加

  // 検索キーワードのリセット
  const resetSearch = () => {
    setSearchKeyword("");
    setActiveTags([]); // タグをリセット
  };

  // アクティブタグの削除
  const removeActiveTag = (tag: string) => {
    // タグを削除し、検索バーからそのタグも削除
    setActiveTags((prevTags) => {
      const newTags = prevTags.filter((t) => t !== tag);
      setSearchKeyword((prevKeyword) => {
        const updatedKeyword = prevKeyword
          .split(" ")
          .filter((keyword) => keyword !== tag) // タグを検索キーワードから削除
          .join(" ");
        return updatedKeyword;
      });
      return newTags;
    });
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
      {/* モーダルの定義 */}
      <QuestionPostModal isOpen={isPostOpen} onClose={onPostClose} />
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
              bg="#f5f5f5"
              p={4}
              boxShadow="md"
              borderRadius="md"
            >
              {filteredQuestions.length > 0 ? (
                <Wrap spacing="16px" justify="flex-start">
                  {filteredQuestions.map((e) => (
                    <WrapItem key={e.id} flexBasis="100%">
                      <Box
                        w="100%"
                        h="210px"
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
          <GridItem
            colSpan={{ base: 10, md: 2 }}
            position="fixed"
            top="105px"
            right="0"
            width={{ base: "100%", md: "20%" }} /* 画面幅の2割 */
            height="100vh"
            zIndex={10}
            bg="#253045"
            boxShadow="md"
            borderRadius="lg"
          >
            <Box p={4} borderRadius="md" height="100%">
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

              {/* 現在選択されているタグ */}
              <Wrap spacing="8px" mb={4}>
                {activeTags.map((tag) => (
                  <Tag
                    key={tag}
                    size="md"
                    variant="solid"
                    colorScheme="blue"
                    cursor="pointer"
                    onClick={() => removeActiveTag(tag)}
                  >
                    {tag}
                    <Button
                      size="xm"
                      ml={2}
                      onClick={() => removeActiveTag(tag)}
                      variant="ghost"
                      colorScheme="gray"
                      fontSize="1.2rem" // 文字サイズを調整
                      _hover={{ bg: "transparent", color: "gray.300" }} // ホバー時の色
                    >
                      ×
                    </Button>
                  </Tag>
                ))}
              </Wrap>

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

              {/* 質問投稿ボタン */}
              <Button
                onClick={onPostOpen}
                variant="solid"
                aria-label="Post Question"
                position="absolute"
                top="80%"
                colorScheme="teal" // ボタンのカラーを変更
                size="lg" // ボタンサイズ
                borderRadius="lg" // 角を丸く
                boxShadow="md" // シャドウ効果
                _hover={{ bg: "teal.500", color: "white" }} // ホバー時に色が変わる
                _active={{ bg: "teal.600" }} // クリック時に色が変わる
                width="auto" // 幅を自動調整
                padding="8px 16px" // ボタン内の余白を調整
                fontSize="lg" // フォントサイズを調整
                color="white" // テキストの色を白に
              >
                Post Question
              </Button>
            </Box>
          </GridItem>
        </SimpleGrid>
      </ContentsWithHeader>
    </>
  );
}
