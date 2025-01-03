import { Tag } from './tag';
import { User } from './user';

// Questionデータの型定義
type Question = {
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
  tags: Tag[];
};

export type { Question };

