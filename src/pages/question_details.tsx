import { AnswerCard } from "@/components/Card/AnswerCard";
import { DetailsQuestionCard } from "@/components/Card/DetailsQuestionCard";
import { AnswerPostModal } from "@/components/Modal/AnswerPostModal";
import { ContentsWithHeader } from "@/components/PageLayout/ContentsWithHeader";
import { Answer } from "@/types/answer";
import { Question } from "@/types/question";
import { Box, Button, Text, useDisclosure, VStack } from "@chakra-ui/react";
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

  useEffect(() => {
    if (query.id) {
      const questionId = parseInt(query.id as string, 10);

      async function QuestionGet() {
        try {
          // const { data, error } = await supabase.auth.getSession();

          const url = `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}`;
          const res = await axios.get(url);
          if (res.status !== 200) {
            throw new Error("Failed to fetch questions");
          }
          setQuestion(res.data as Question);
        } catch (err) {
          console.error(err);
        }
      }

      useEffect(() => {
        const init = async () => {
          await QuestionGet();
        };
        init();
      }, []);

      async function AnswerGet() {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/answers/${questionId}`;
          const res = await axios.get(url);
          if (res.status !== 200) {
            throw new Error("Failed to fetch questions");
          }
          setQuestion(res.data as Question);
        } catch (err) {
          console.error(err);
        }
      }

      useEffect(() => {
        const init = async () => {
          await QuestionGet();
        };
        init();
      }, []);
    }
    [query.id];
  });

  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <ContentsWithHeader>
      <Box p={4}>
        {/* 質問カード */}
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

        {/* 回答セクション */}
        <VStack spacing={4} align="stretch" mt={8}>
          <Text fontSize="xl" fontWeight="bold">
            Answers
          </Text>
          {answers.length > 0 ? (
            answers.map((answer) => (
              <AnswerCard
                key={answer.id}
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
            ))
          ) : (
            <Text color="gray.500" textAlign="center">
              現在、この質問には回答がありません。
            </Text>
          )}
        </VStack>
      </Box>

      {/* モーダルの定義 */}
      <AnswerPostModal isOpen={isPostOpen} onClose={onPostClose} />

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
