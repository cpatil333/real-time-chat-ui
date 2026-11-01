import { ChatType } from "../types/chat.type";

const now = Date.now();
export const message: ChatType[] = [
  { id: 1, sender: "me", text: "how are you?", timestamp: now - 60000 },
  {
    id: 2,
    sender: "other",
    text: "I'm good! How about you?",
    timestamp: now - 30000,
  },
  { id: 3, sender: "me", text: "I'm doing well.", timestamp: now },
];
