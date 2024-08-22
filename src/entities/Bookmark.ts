import Article from "./Article";

interface Game {
  id: number;
  name: string;
  description?: string;
  slug: string;
  background_image: string;
  metacritic?: number;
  rating_top?: number;
}

export interface UserBookmarks {
  id: number;
  user_id: number;
  game_id?: number;
  article_id?: number;
  article?: Article;
  entity_type: string;
  game?: Game; // Use the Game interface here
}
