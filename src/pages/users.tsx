import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { QuestionCard } from "@/components/Card/QuestionCard";
import ProfileModal from "@/components/Modal/ProfileModal";
import QuestionDeleteModal from "@/components/Modal/QuestionDeleteModal";
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserPage() {
  const router = useRouter();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();

  // サンプルデータ（現在のユーザーの質問のみ）
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      user_name: "Faker",
      title: "EXAMPLE",
      content:
        "この文章は、指定された文字数を超えるために作成された例文です。文章の長さが百字を超えるように調整し、内容としては何かしらの意味が通るようにしています。まだ百字じゃないの？まだ？あいうえお",
      user_id: 1,
      is_anonymous: false,
      created_ad: "2024-12-11",
      likes: 10,
      bookmarks: 5,
      isLiked: true,
      isBookmarked: false,
      tags: ["JavaScript", "React", "Backend"],
    },
    {
      id: 2,
      user_name: "eto",
      title: "Another Question",
      content:
        "Here's another example question with a moderate length content.",
      user_id: 2,
      is_anonymous: false,
      created_ad: "2024-12-10",
      likes: 3,
      bookmarks: 2,
      isLiked: true,
      isBookmarked: false,
      tags: ["Backend", "Node.js"],
    },
    {
      id: 3,
      user_name: "davis",
      title: "質問例！",
      content: "この質問をブックマークした質問に表示したい",
      user_id: 3,
      is_anonymous: false,
      created_ad: "2024-12-15",
      likes: 3,
      bookmarks: 2,
      isLiked: false,
      isBookmarked: true,
      tags: ["Backend", "健康"],
    },
  ]);

  // ユーザー情報
  const user = {
    id: 1,
    name: "Faker",
    bio: "Web developer, React enthusiast.",
    avatar: "/avatar.png", // 仮のアバター画像URL
  };

  // const [users, setUsers] = useState<User[]>([]);

  //  async function handleGet() {
  //    try {
  //      const url = process.env.NEXT_PUBLIC_API_URL + "/users/{id}/users";
  //      const res = await axios.get(url);
  //      if (res.status !== 200) {
  //        throw new Error("Failed to fetch questions");
  //      }
  //      setQuestions(res.data as Question[]);
  //    } catch (err) {
  //      console.error(err);
  //    }
  //  }

  //  useEffect(() => {
  //    const init = async () => {
  //      await handleGet();
  //    };
  //    init();
  //  }, []);

  // 検索状態管理
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredQuestions, setFilteredQuestions] =
    useState<Question[]>(questions);

  // 削除対象の質問 ID を管理するステートを追加
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // モーダルの開閉状態管理
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  // モーダルの「削除」ボタンが押されたときの処理
  const confirmDelete = () => {
    if (deleteTargetId !== null) {
      setQuestions((prev) => prev.filter((q) => q.id !== deleteTargetId));
      setDeleteTargetId(null); // ターゲットをリセット
    }
    onDeleteModalClose();
  };

  const renderQuestionCards = (questions: Question[]) => {
    return questions.map((e) => (
      <WrapItem key={e.id} w="100%">
        <Box
          w="100%"
          h="auto"
          cursor="pointer"
          borderRadius="md"
          _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
          transition="0.2s ease"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={4}
        >
          {/* 質問カード部分 */}
          <Box flex="1">
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
              onToggleLike={() => toggleLike(e.id)}
              onToggleBookmark={() => toggleBookmark(e.id)}
              onClick={() => router.push(`/question_details?id=${e.id}`)}
            />
          </Box>

          {/* ボタン部分 (自分の質問のみ表示) */}
          {e.user_id === user.id && (
            <Box display="flex" gap="8px" ml={4}>
              <Button
                size="sm"
                colorScheme="teal"
                variant="outline"
                onClick={() => handleEditQuestion(e.id)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={() => {
                  setDeleteTargetId(e.id); // 削除対象を設定
                  onDeleteModalOpen(); // モーダルを開く
                }}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </WrapItem>
    ));
  };

  const handleEditQuestion = (id: number) => {
    // 編集処理（例: モーダルを表示）
    alert(`Editing question ID: ${id}`);
  };

  const handleDeleteQuestion = (id: number) => {
    // 削除処理
    if (confirm("Are you sure you want to delete this question?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  // タブで選択された質問の管理
  const [selectedTab, setSelectedTab] = useState(0);

  // 質問のフィルタリング（タブ選択による）
  const getFilteredQuestions = (tabIndex: number) => {
    let filtered = questions;

    switch (tabIndex) {
      case 0:
        // 自分の質問
        filtered = questions.filter((q) => q.user_id === user.id);
        break;
      case 1:
        // いいねした質問
        filtered = questions.filter((q) => q.isLiked);
        break;
      case 2:
        // ブックマークした質問
        filtered = questions.filter((q) => q.isBookmarked);
        break;
    }

    // 検索キーワードによるフィルタリング
    if (searchKeyword) {
      const keywords = searchKeyword
        .toLowerCase()
        .split(/\s+/)
        .filter((k) => k.trim() !== "");

      filtered = filtered.filter((q) =>
        keywords.every(
          (keyword) =>
            q.title.toLowerCase().includes(keyword) ||
            q.user_name.toLowerCase().includes(keyword) ||
            q.content.toLowerCase().includes(keyword) ||
            q.tags.some((tag) => tag.toLowerCase().includes(keyword))
        )
      );
    }

    return filtered;
  };

  // 検索処理のuseEffect
  useEffect(() => {
    setFilteredQuestions(getFilteredQuestions(selectedTab));
  }, [searchKeyword, selectedTab, questions]);

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
        <title>User Page - {user.name}</title>
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
          {/* 左側：タブと質問カード */}
          <GridItem colSpan={{ base: 10, md: 8 }}>
            <Box
              height="100%"
              bg="#f5f5f5"
              p={4}
              boxShadow="md"
              borderRadius="md"
            >
              {/* タブ機能 */}
              <Tabs
                isFitted
                variant="enclosed"
                colorScheme="teal"
                index={selectedTab}
                onChange={(index) => setSelectedTab(index)}
              >
                <TabList>
                  <Tab
                    _selected={{
                      bg: "teal.500",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    自分の質問
                  </Tab>
                  <Tab
                    _selected={{
                      bg: "teal.500",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    いいねした質問
                  </Tab>
                  <Tab
                    _selected={{
                      bg: "teal.500",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    ブックマークした質問
                  </Tab>
                </TabList>
                <TabPanels>
                  {/* 自分の質問 */}
                  <TabPanel>
                    {getFilteredQuestions(0).length > 0 ? (
                      <Wrap spacing="16px" justify="flex-start">
                        {renderQuestionCards(getFilteredQuestions(0))}
                      </Wrap>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        w="100%"
                      >
                        <Text color="gray.500" textAlign="center" fontSize="lg">
                          質問が見つかりません。
                        </Text>
                      </Box>
                    )}
                  </TabPanel>

                  {/* いいねした質問 */}
                  <TabPanel>
                    {getFilteredQuestions(1).length > 0 ? (
                      <Wrap spacing="16px" justify="flex-start">
                        {renderQuestionCards(getFilteredQuestions(1))}
                      </Wrap>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                        <Text color="gray.500" textAlign="center" fontSize="lg">
                          いいねした質問が見つかりません。
                        </Text>
                      </Box>
                    )}
                  </TabPanel>

                  {/* ブックマークした質問 */}
                  <TabPanel>
                    {getFilteredQuestions(2).length > 0 ? (
                      <Wrap spacing="16px" justify="flex-start">
                        {renderQuestionCards(getFilteredQuestions(2))}
                      </Wrap>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                      >
                        <Text color="gray.500" textAlign="center" fontSize="lg">
                          ブックマークした質問が見つかりません。
                        </Text>
                      </Box>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>

          {/* 右側：ユーザー情報と検索欄 */}
          <GridItem colSpan={{ base: 10, md: 2 }}>
            <Box
              height="100%"
              bg="#253045"
              p={4}
              boxShadow="md"
              borderRadius="md"
            >
              {/* ユーザー情報 */}
              <VStack spacing={4} align="center" mb={6}>
                <Box
                  w="100px"
                  h="100px"
                  borderRadius="full"
                  bg="gray.300"
                  bgImage={`url(${user.avatar})`}
                  bgSize="cover"
                />
                <Text fontSize="lg" color="white">
                  {user.name}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  {user.bio}
                </Text>
              </VStack>

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
                    height="2rem"
                    minWidth="2rem"
                    bg="transparent"
                    color="gray.500"
                    fontSize="1.2rem"
                    _hover={{ bg: "transparent", color: "gray.700" }}
                    _active={{ bg: "transparent", color: "gray.900" }}
                    onClick={() => setSearchKeyword("")}
                  >
                    ×
                  </Button>
                </InputRightElement>
              </InputGroup>

              {/* アクションボタン */}
              <Button
                w="100%"
                colorScheme="teal"
                mb={4}
                onClick={onProfileOpen}
              >
                プロフィール編集
              </Button>
              <LogoutButton />
            </Box>
          </GridItem>
        </SimpleGrid>
      </ContentsWithHeader>

      {/* モーダルの定義 */}
      <ProfileModal isOpen={isProfileOpen} onClose={onProfileClose} />
      {/* 削除確認モーダル */}
      <QuestionDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setDeleteTargetId(null); // ターゲットをリセット
          onDeleteModalClose();
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
}
