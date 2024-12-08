export type User = {
  //id: number; 
  username: string;
  email: string;
  password: string;
};

export type Board = {
  id: number;
  //user_id: number;
  title: string;
  created_at: string;
  //color: string;
  items: List[];
};

export type List = {
  id: number;
  board_id: number;
  title: string;
  created_at: string;
  items: Card[];
};

export type Card = {
  id: number;
  list_id: number;
  title: string;
  description: string;
  created_at: string;
};
