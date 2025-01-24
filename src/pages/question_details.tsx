import { AnswerCard } from "@/components/Card/AnswerCard";
import { DetailsQuestionCard } from "@/components/Card/DetailsQuestionCard";
import { AnswerPostModal } from "@/components/Modal/AnswerPostModal";
import { ContentsWithHeader } from "@/components/PageLayout/ContentsWithHeader";
import { Answer } from "@/types/answer";
import { Question } from "@/types/question";
import {
  Box,
  Button,
  Center,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function QuestionDetails() {
  const router = useRouter();
  const { query } = router;
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useDisclosure();

  // 質問と回答を取得する関数
  const fetchQuestionAndAnswers = async () => {
    if (query.id) {
      const questionId = parseInt(query.id as string, 10);
      try {
        // 質問の詳細を取得
        const questionRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`
        );
        if (questionRes.status === 200) {
          setQuestion(questionRes.data as Question);
        } else {
          throw new Error("Failed to fetch question details");
        }

        // 回答の一覧を取得
        const answersRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/answers/${questionId}`
        );
        if (answersRes.status === 200) {
          setAnswers(answersRes.data as Answer[]);
        } else {
          throw new Error("Failed to fetch answers");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 質問と回答の取得をuseEffectで実行
  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [query.id]);

  if (!question) {
    return (
      <Center w="100%" h="100vh">
        <VStack spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
          <Text fontSize="lg" fontWeight="medium" color="gray.600">
            Loading question details...
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <ContentsWithHeader>
      <Box p={4} w="100%" maxW="1200px" mx="auto">
        {/* 質問カード */}
        <Box w="100%" mb={8}>
          <DetailsQuestionCard
            question={question}
            onToggleLike={() =>
              setQuestion((prev) =>
                prev
                  ? {
                      ...prev,
                      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
                      isLiked: !prev.isLiked,
                    }
                  : null
              )
            }
            onToggleBookmark={() =>
              setQuestion((prev) =>
                prev
                  ? {
                      ...prev,
                      bookmarks: prev.isBookmarked
                        ? prev.bookmarks - 1
                        : prev.bookmarks + 1,
                      isBookmarked: !prev.isBookmarked,
                    }
                  : null
              )
            }
          />
        </Box>

        {/* 回答セクション */}
        <VStack spacing={4} align="stretch" w="100%">
          <Text fontSize="xl" fontWeight="bold">
            Answers
          </Text>
          {answers.length > 0 ? (
            answers.map((answer) => (
              <Box key={answer.id} w="100%">
                <AnswerCard
                  {...answer}
                  onToggleLike={() =>
                    setAnswers((prev) =>
                      prev.map((a) =>
                        a.id === answer.id
                          ? {
                              ...a,
                              likes: a.isLiked ? a.likes - 1 : a.likes + 1,
                              isLiked: !a.isLiked,
                            }
                          : a
                      )
                    )
                  }
                />
              </Box>
            ))
          ) : (
            <Text color="gray.500" textAlign="center">
              現在、この質問には回答がありません。
            </Text>
          )}
        </VStack>
      </Box>

      {/* モーダルの定義 */}
      <AnswerPostModal
        isOpen={isPostOpen}
        onClose={onPostClose}
        fetchQuestionAndAnswers={fetchQuestionAndAnswers}
        questionId={question.id} // ここでquestionIdを渡す
      />

      {/* 回答投稿ボタン */}
      <Button
        onClick={onPostOpen}
        variant="solid"
        aria-label="Post Answer"
        position="fixed" // 固定位置
        bottom="20px" // 画面下からの距離
        right="20px" // 画面右からの距離
        colorScheme="orange" // ボタンのカラー
        size="lg" // ボタンサイズ
        borderRadius="full" // 丸みを強調
        boxShadow="lg" // シャドウ効果
        _hover={{ bg: "orange.400", color: "white" }} // ホバー時に色が変わる
        _active={{ bg: "orange.600" }} // クリック時に色が変わる
        padding="16px" // ボタン内の余白を調整
        fontSize="lg" // フォントサイズを調整
        color="white" // テキストの色を白に
      >
        Post Answer
      </Button>
    </ContentsWithHeader>
  );
}
