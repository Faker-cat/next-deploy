// Questionデータの型定義
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
  tags: string[];
};

export type { Question };

