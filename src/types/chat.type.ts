export type ChatType = {
  id: string;
  senderId: string;
  sender: "me" | "other";
  text: string;
  timestamp: number;
};
