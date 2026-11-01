type TypingIndicatorProps = {
  isTyping: boolean;
};

export const TypingIndicator = ({ isTyping }: TypingIndicatorProps) => {
  return <div> {isTyping && <p>You are typing...</p>}</div>;
};
