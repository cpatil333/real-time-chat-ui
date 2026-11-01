import { ChatType } from "../types/chat.type";

type MessageItemProps = {
  message: ChatType;
};

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div>
      {message.sender} : {message.text}
    </div>
  );
};
