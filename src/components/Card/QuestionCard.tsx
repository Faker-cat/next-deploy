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
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";

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

// タグカラーをキャッシュするマップ
const tagColorCache: Record<string, string> = {};

// ランダムな色を生成する関数
function getRandomColor(tag: string): string {
  // 既に色が割り当てられている場合はキャッシュを使用
  if (tagColorCache[tag]) {
    return tagColorCache[tag];
  }

  // ランダムに色を選択
  const randomColor =
    colorPalette[Math.floor(Math.random() * colorPalette.length)];

  // キャッシュに保存
  tagColorCache[tag] = randomColor;

  return randomColor;
}

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
  tags: string[]; // タグ情報を追加
  onToggleLike: (e: React.MouseEvent) => void; // いいね切り替え関数（イベントを受け取る）
  onToggleBookmark: (e: React.MouseEvent) => void; // ブックマーク切り替え関数（イベントを受け取る）
  onClick: () => void; // 詳細ページに遷移するためのクリックハンドラ
};

function truncateContent(content: string): string {
  const maxLength = 70; // 最大文字数
  const visibleLength = 67; // 最初の表示文字数
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
    tags,
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
        <Box maxW={"calc(100% - 110px)"} onClick={onClick}>
          <Text fontSize="lg" fontWeight="bold" color="teal.600">
            {title}
          </Text>
        </Box>
        <Box onClick={onClick}>
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
        </Box>

        {/* タグ表示 */}
        <Wrap spacing={2} mt={1}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              bg={`${getRandomColor(tag)}.200`} // タグの色を取得
              color={`${getRandomColor(tag)}.700`}
              size="sm"
            >
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </Wrap>
      </VStack>

      {/* いいね & ブックマーク */}
      <HStack position="absolute" top={3.5} right={2} spacing={4}>
        <HStack>
          <IconButton
            aria-label="like"
            icon={isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation(); // クリックイベントの伝播を停止
              onToggleLike(e); // いいね切り替え
            }}
            sx={{
              animation: isLiked ? `${popAnimation} 0.3s ease` : "none",
            }}
          />
          <Text fontSize="sm">{likes}</Text>
        </HStack>
        <HStack>
          <IconButton
            aria-label="bookmark"
            icon={
              isBookmarked ? <FaBookmark color="orange" /> : <FaRegBookmark />
            }
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation(); // クリックイベントの伝播を停止
              onToggleBookmark(e); // ブックマーク切り替え
            }}
            sx={{
              animation: isBookmarked ? `${popAnimation} 0.3s ease` : "none",
            }}
          />
          <Text fontSize="sm">{bookmarks}</Text>
        </HStack>
      </HStack>
    </Box>
  );
}
