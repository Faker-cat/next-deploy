// import { Bookmark } from './bookmark';
import { Like } from './like';
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
  likes: Like[];
  // bookmarks: Bookmark[];
  bookmarks: number;
  isBookmarked: boolean; // ブックマーク状態
  tags: Tag[];
};

export type { Question };

