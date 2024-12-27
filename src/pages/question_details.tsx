import { AnswerCard } from "@/components/Card/AnswerCard";
import { DetailsQuestionCard } from "@/components/Card/DetailsQuestionCard";
import { ContentsWithHeader } from "@/components/PageLayout/ContentsWithHeader";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
};

type Answer = {
  id: number;
  user_name: string;
  content: string;
  created_ad: string;
  likes: number;
  isLiked: boolean;
};

export default function QuestionDetails() {
  const router = useRouter();
  const { query } = router;
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (query.id) {
      const questionId = parseInt(query.id as string, 10);

      // サンプルデータ
      const sampleQuestion: Question = {
        id: questionId,
        user_name: "Faker",
        title: "EXAMPLE",
        content:
          "この文章は、指定された文字数を超えるために作成された例文です。文章の長さが百字を超えるように調整し、内容としては何かしらの意味が通るようにしています。",
        user_id: 1,
        is_anonymous: true,
        created_ad: "2024-12-11",
        likes: 10,
        bookmarks: 5,
        isLiked: false,
        isBookmarked: false,
        tags: ["React", "ChakraUI", "TypeScript"],
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

  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <ContentsWithHeader>
      <Box p={4}>
        {/* 質問カード */}
        <DetailsQuestionCard
          {...question}
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
    </ContentsWithHeader>
  );
}
