import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// ポップアニメーション
const popAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

type AnswerCardProps = {
  user_name: string;
  content: string;
  created_ad: string;
  likes: number;
  isLiked: boolean;
  onToggleLike: () => void;
};

export function AnswerCard({
  user_name,
  content,
  created_ad,
  likes,
  isLiked,
  onToggleLike,
}: AnswerCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" bg="white">
      <VStack align="start" spacing={2}>
        {/* 投稿者名 */}
        <Text fontSize="sm" color="gray.500">
          回答者: {user_name}
        </Text>

        {/* 投稿時刻 */}
        <Text fontSize="xs" color="gray.400">
          投稿日時: {created_ad}
        </Text>

        {/* 本文 */}
        <Text fontSize="md" color="gray.700">
          {content}
        </Text>

        {/* いいね */}
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
      </VStack>
    </Box>
  );
}
