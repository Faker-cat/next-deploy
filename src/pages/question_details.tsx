import { BackButton } from "@/components/Buttons/BackButton";
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
  isLiked: boolean; // いいね状態
  isBookmarked: boolean; // ブックマーク状態
};

export default function QuestionDetails() {
  const router = useRouter();
  const { query } = router;
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (query.id) {
      // クエリパラメータからIDを取得
      const questionId = parseInt(query.id as string, 10);

      // サンプルデータ（ここではデータをハードコーディング）
      const sampleQuestions: Question[] = [
        {
          id: 1,
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
        },
        // 他の質問データ...
      ];

      // IDに一致する質問を検索
      const selectedQuestion = sampleQuestions.find((q) => q.id === questionId);
      setQuestion(selectedQuestion || null);
    }
  }, [query.id]);

  if (!question) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">{question.title}</Text>
        <Text fontSize="sm" color="gray.500">
          投稿者: {question.is_anonymous ? "匿名" : question.user_name}
        </Text>
        <Text fontSize="xs" color="gray.400">
          投稿日時: {question.created_ad}
        </Text>
        <Text>{question.content}</Text>
        <BackButton/>
      </VStack>
    </Box>
  );
}
