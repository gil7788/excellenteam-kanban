export type User = {
  //id: string;
  username: string;
  email: string;
  password: string;
};

export type Board = {
  //id: string;
  //user_id: string;
  //title: string;
  //createdAt: string;
  lists: List[];
  //color: string;
} & BoardMetadata;

export type BoardMetadata = {
  id: string;
  //user_id: string;
  title: string;
  createdAt: string;
  //color: string;
};

export type List = {
  id: string;
  //board_id: string;
  title: string;
  createdAt: string;
  cards: Card[];
};

export type Card = {
  id: string;
  //list_id: string;
  title: string;
  description?: string;
  createdAt: string;
  //updatedAt: string;
  dueDate: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
  color: string;
};
