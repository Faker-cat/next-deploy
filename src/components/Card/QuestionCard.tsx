import { Box, Text, VStack } from "@chakra-ui/react";

type QuestionCardProps = {
  id: number;
  user_name: string;
  title: string;
  content: string;
  user_id: number;
  is_anonymous: boolean;
  created_ad: string;
};

// 本文を加工する関数
function truncateContent(content: string): string {
  const maxLength = 160; // 最大文字数
  const visibleLength = 157; // 最初の表示文字数
  if (content.length > maxLength) {
    return (
      content.slice(0, visibleLength) + "..." // 158, 159, 160文字目を「・・・」に置き換え
    );
  }
  return content;
}

export function QuestionCard(props: QuestionCardProps) {
  const { title, user_name, content, is_anonymous, created_ad } = props;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      bg="white"
      height="100%" // カード全体の高さを固定
    >
      <VStack align="start" spacing={2} height="100%">
        {/* タイトル */}
        <Text fontSize="lg" fontWeight="bold" color="teal.600">
          {title}
        </Text>

        {/* ユーザー名 */}
        <Text fontSize="sm" color="gray.500">
          投稿者: {is_anonymous ? "匿名" : user_name}
        </Text>

        {/* 投稿時刻 */}
        <Text fontSize="xs" color="gray.400">
          投稿日時: {created_ad}
        </Text>

        {/* 本文 */}
        <Box
          flex="1"
          width="100%"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <Text fontSize="md" color="gray.700">
            {truncateContent(content)}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
