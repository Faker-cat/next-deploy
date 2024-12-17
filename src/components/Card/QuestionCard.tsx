import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";

// ポップアニメーションのキーフレーム
const popAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

type QuestionCardProps = {
  id: number;
  user_name: string;
  title: string;
  content: string;
  is_anonymous: boolean;
  created_ad: string;
  likes: number;
  bookmarks: number;
  isLiked: boolean; // いいね状態
  isBookmarked: boolean; // ブックマーク状態
  onToggleLike: () => void; // いいね切り替え関数
  onToggleBookmark: () => void; // ブックマーク切り替え関数
  onClick: () => void; // 詳細ページに遷移するためのクリックハンドラ
};

function truncateContent(content: string): string {
  const maxLength = 90; // 最大文字数
  const visibleLength = 87; // 最初の表示文字数
  if (content.length > maxLength) {
    return content.slice(0, visibleLength) + "...";
  }
  return content;
}

export function QuestionCard(props: QuestionCardProps) {
  const {
    title,
    user_name,
    content,
    is_anonymous,
    created_ad,
    likes,
    bookmarks,
    isLiked,
    isBookmarked,
    onToggleLike,
    onToggleBookmark,
    onClick, // 詳細ページ遷移用
  } = props;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      bg="white"
      height="100%"
      position="relative"
    >
      <VStack align="start" spacing={2}>
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
        <Box flex="1" width="100%" overflow="hidden" textOverflow="ellipsis">
          <Text fontSize="md" color="gray.700">
            {truncateContent(content)}
          </Text>
        </Box>
      </VStack>

      {/* いいね & ブックマーク */}
      <HStack position="absolute" top={2} right={2} spacing={4}>
        <HStack>
          <IconButton
            aria-label="like"
            icon={isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            size="sm"
            variant="ghost"
            onClick={onToggleLike}
            sx={{
              animation: isLiked ? `${popAnimation} 0.3s ease` : "none",
            }}
          />
          <Text fontSize="sm">{likes}</Text>
        </HStack>
        <HStack>
          <IconButton
            aria-label="bookmark"
            icon={isBookmarked ? <FaBookmark color="orange" /> : <FaRegBookmark />}
            size="sm"
            variant="ghost"
            onClick={onToggleBookmark}
            sx={{
              animation: isBookmarked ? `${popAnimation} 0.3s ease` : "none",
            }}
          />
          <Text fontSize="sm">{bookmarks}</Text>
        </HStack>
      </HStack>

      {/* カードクリックで詳細ページに遷移 */}
      <Box
        w="100%"
        h="100%"
        cursor="pointer"
        position="absolute"
        top={0}
        left={0}
        onClick={onClick} // ここで状態更新と遷移を両方行う
      />
    </Box>
  );
}
