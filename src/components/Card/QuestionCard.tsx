import { Tag as TagModel } from "@/types/tag";
import { User } from "@/types/user";
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
import { format } from "date-fns"; // date-fnsライブラリを使う場合
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

// ランダムな色を生成する関数
function getColor(tagId: number): string {
  return colorPalette[tagId % colorPalette.length];
}

type QuestionCardProps = {
  id: number;
  user: User;
  title: string;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  likes: number;
  bookmarks: number;
  isLiked: boolean; // いいね状態
  isBookmarked: boolean; // ブックマーク状態
  tags: TagModel[]; // タグ情報を追加
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

function formatDate(date: string): string {
  const parsedDate = new Date(date);
  // 日付のフォーマット（例：2025年1月24日 15:30）
  return format(parsedDate, "yyyy年MM月dd日 HH:mm");
}

export function QuestionCard(props: QuestionCardProps) {
  const {
    title,
    user,
    content,
    is_anonymous,
    created_at,
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
            投稿者: {is_anonymous ? "匿名" : user.display_name}
          </Text>

          {/* 投稿時刻 */}
          <Text fontSize="xs" color="gray.400">
            投稿日時: {formatDate(created_at)} {/* フォーマットされた日時 */}
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
        <HStack spacing={0.1}>
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
