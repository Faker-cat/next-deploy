import {
  Box,
  HStack,
  IconButton,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { format } from "date-fns";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { Question } from "../../types/question";

// ポップアニメーションのキーフレーム
const popAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

// Chakra UIのカラーパレットを使用
const colorPalette = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

// ランダムな色を生成する関数
function getColor(tagId: number): string {
  return colorPalette[tagId % colorPalette.length];
}

type QuestionCardProps = {
  question: Question;
  onToggleLike: (e: React.MouseEvent) => void; // いいね切り替え関数（イベントを受け取る）
  onToggleBookmark: (e: React.MouseEvent) => void; // ブックマーク切り替え関数（イベントを受け取る）
};

function formatDate(date: string): string {
  const parsedDate = new Date(date);
  // 日付のフォーマット（例：2025年1月24日 15:30）
  return format(parsedDate, "yyyy年MM月dd日 HH:mm");
}

export function DetailsQuestionCard(props: QuestionCardProps) {
  const { question, onToggleLike, onToggleBookmark } = props;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      bg="white"
      position="relative"
    >
      <VStack align="start" spacing={3}>
        {/* タイトル */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="teal.600">
            {question.title}
          </Text>
        </Box>

        {/* 投稿者と日時 */}
        <Box>
          <Text fontSize="sm" color="gray.500">
            投稿者:{" "}
            {question.is_anonymous ? "匿名" : question.user.display_name}
          </Text>
          <Text fontSize="xs" color="gray.400">
            投稿日時:{formatDate(question.created_at)}
          </Text>
        </Box>

        {/* 本文 */}
        <Box>
          <Text fontSize="md" color="gray.700" whiteSpace="pre-line">
            {question.content}
          </Text>
        </Box>

        {/* タグ表示 */}
        <Wrap spacing={2} mt={1}>
          {question.tags.map((tag) => (
            <Tag
              key={tag.id}
              bg={`${getColor(tag.id)}.200`} // タグの色を取得
              color={`${getColor(tag.id)}.700`}
              size="sm"
            >
              <TagLabel>{tag.name}</TagLabel>
            </Tag>
          ))}
        </Wrap>
      </VStack>

      {/* いいね & ブックマーク */}
      <HStack position="absolute" top={3.5} right={2} spacing={2}>
        <HStack>
          <IconButton
            aria-label="like"
            icon={question.isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation(); // クリックイベントの伝播を停止
              onToggleLike(e); // いいね切り替え
            }}
            sx={{
              animation: question.isLiked
                ? `${popAnimation} 0.3s ease`
                : "none",
            }}
          />
          <Text fontSize="sm">{question.likes}</Text>
        </HStack>
        <HStack spacing={0.1}>
          <IconButton
            aria-label="bookmark"
            icon={
              question.isBookmarked ? (
                <FaBookmark color="orange" />
              ) : (
                <FaRegBookmark />
              )
            }
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation(); // クリックイベントの伝播を停止
              onToggleBookmark(e); // ブックマーク切り替え
            }}
            sx={{
              animation: question.isBookmarked
                ? `${popAnimation} 0.3s ease`
                : "none",
            }}
          />
          <Text fontSize="sm">{question.bookmarks}</Text>
        </HStack>
      </HStack>
    </Box>
  );
}
