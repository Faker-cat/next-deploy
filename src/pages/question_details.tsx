import { AnswerCard } from "@/components/Card/AnswerCard";
import { DetailsQuestionCard } from "@/components/Card/DetailsQuestionCard";
import { AnswerPostModal } from "@/components/Modal/AnswerPostModal";
import { ContentsWithHeader } from "@/components/PageLayout/ContentsWithHeader";
import { sessionState } from "@/libs/states";
import { Answer } from "@/types/answer";
import { Like } from "@/types/like";
import { Question } from "@/types/question";
import { Box, Button, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function QuestionDetails() {
  const [session] = useRecoilState<Session | null>(sessionState);
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

      // サンプルデータ
      const sampleQuestion: Question = {
        id: questionId,
        title: "EXAMPLE",
        user: {
          id: "489bee16-570f-bec6-b058-b9f1a262f641",
          display_name: "faker",
          bio: "aaa",
          created_at: "2024-12-11",
        },
        content:
          "この文章は、指定された文字数を超えるために作成された例文です。文章の長さが百字を超えるように調整し、内容としては何かしらの意味が通るようにしています。",
        is_anonymous: true,
        created_at: "2024-12-11",
        likes: [{ id: 1, user_id: "489bee16-570f-bec6-b058-b9f1a262f641" }],
        bookmarks: 5,
        isBookmarked: false,
        tags: [
          {
            id: 1,
            name: "Python",
          },
          {
            id: 2,
            name: "SQLAlchemy",
          },
        ],
      };

      const sampleAnswers: Answer[] = [
        {
          id: 1,
          user_name: "eto",
          content: "これは回答の例です。",
          created_ad: "2024-12-12",
          likes: 3,
          isLiked: false,
        },
        {
          id: 2,
          user_name: "davis",
          content: "別の回答例です。",
          created_ad: "2024-12-13",
          likes: 5,
          isLiked: true,
        },
      ];

      setQuestion(sampleQuestion);
      setAnswers(sampleAnswers);
    }
  }, [query.id]);

  // いいねの切り替え処理
  const toggleLike = () => {
    if (!session?.user.id) return;
    if (!question) return;

    const createLike = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/likes?user_id=${session?.user.id}&question_id=${question.id}`;
      await axios.post(url);
    };
    const deleteLike = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/likes?user_id=${session?.user.id}&question_id=${question.id}`;
      await axios.delete(url);
    };

    if (question?.likes.find((l) => l.user_id === session?.user.id)) {
      deleteLike();
      const newLikes = question.likes.filter(
        (l) => l.user_id !== session?.user.id
      );
      setQuestion((prev) => (prev ? { ...prev, likes: newLikes } : null));
    } else {
      createLike();
      const newLike = { id: 0, user_id: session?.user.id } as Like;
      setQuestion((prev) =>
        prev ? { ...prev, likes: [...prev.likes, newLike] } : null
      );
    }
  };

  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <ContentsWithHeader>
      <Box p={4}>
        {/* 質問カード */}
        <DetailsQuestionCard
          question={question}
          onToggleLike={toggleLike}
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
