export default interface Article {
  id: number;
  title: string;
  content: string;
  user_id: number;
  imgae?: string;
  created_at: Date;
  updated_at: Date;
}
