import { Board } from "../types/types";

export const mockBoard: Board[] = [
  {
    id: "board-1",
    title: "board title",
    createdAt: new Date(2024, 11, 1).toISOString(),
    lists: [
      {
        id: "list-1",
        title: "To Do",
        createdAt: new Date(2024, 11, 2).toISOString(),
        cards: [
          {
            id: "card-1",
            title: "Sample Task 1",
            description: "This is a sample task.",
            createdAt: new Date(2024, 11, 5).toISOString(),
            dueDate: new Date(2025, 3, 1).toISOString(),
            tagIds: [],
          },
          {
            id: "card-2",
            title: "Sample Task 2",
            description: "Another sample task.",
            createdAt: new Date(2024, 11, 6).toISOString(),
            dueDate: new Date(2025, 10, 1).toISOString(),
            tagIds: [],
          },
        ],
      },
      {
        id: "list-2",
        title: "In Progress",
        createdAt: new Date(2024, 11, 3).toISOString(),
        cards: [],
      },
      {
        id: "list-3",
        title: "Done",
        createdAt: new Date(2024, 11, 4).toISOString(),
        cards: [],
      },
    ],
    tags: [],
    color: "",
  },
];
