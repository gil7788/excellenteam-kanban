// export interface BoardDataType {
//   id: string;
//   title: string;
//   description?: string;
// }

// export type TaskT = {
// 	id: string;
// 	title: string;
// 	description: string;
// 	priority: string;
// 	deadline: number;
// 	image?: string;
// 	alt?: string;
// 	tags: { title: string; bg: string; text: string }[];
// };

// type Column = {
// 	name: string;
// 	items: TaskT[];
// };

// export type Columns = {
// 	[key: string]: Column;
// };

export type User = {
  id: number; 
  password: string;
  fullname: string;
  email: string;
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
