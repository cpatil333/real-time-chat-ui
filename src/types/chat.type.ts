export type ChatType = {
  id: number;
  sender: "me" | "other";
  text: string;
  timestamp: number;
};
