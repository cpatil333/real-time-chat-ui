import { ChatType } from "../types/chat.type";
import { MessageItem } from "./MessageItem";

type MessageListProps = {
  messages: ChatType[];
};
export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div>
      {messages.map((mes) => (
        <MessageItem key={mes.id} message={mes} />
      ))}
    </div>
  );
};
