import { useState, FormEvent } from "react";
import { TypingIndicator } from "./TypingIndicator";

type MessageInputProps = {
  isConnected: boolean;
  onSendMessage: (text: string) => void;
  onReceivedMessage: (text: string) => void;
};

export const MessageInput = ({
  isConnected,
  onSendMessage,
  onReceivedMessage,
}: MessageInputProps) => {
  const [inputSendMessage, setInputSendMessage] = useState("");
  const [inputReceivedMessage, setInputReceivedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputSendMessage.trim()) return;

    onSendMessage(inputSendMessage);
    setInputSendMessage("");
    setIsTyping(false);
  };

  const handleReceivedMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputReceivedMessage.trim()) return;

    onReceivedMessage(inputReceivedMessage);
    setInputReceivedMessage("");
    setIsTyping(false);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputSendMessage}
            style={{
              width: "250px",
              padding: "3px",
              margin: "5px",
              outlineColor: "black",
              border: "1px solid gray",
            }}
            onChange={(e) => {
              setInputSendMessage(e.target.value);
              setIsTyping(e.target.value.trim().length > 0);
            }}
            placeholder="Enter Chart.."
          />
          <button
            type="submit"
            style={{
              width: "45px",
              color: !isConnected ? "grey" : "black",
              backgroundColor: "lightblue",
              padding: "1px",
              margin: "5px",
            }}
            disabled={!isConnected}
          >
            Send
          </button>
        </form>
        <form onSubmit={handleReceivedMessage}>
          <input
            type="text"
            value={inputReceivedMessage}
            style={{
              width: "250px",
              padding: "3px",
              margin: "5px",
              outlineColor: "black",
              border: "1px solid gray",
            }}
            onChange={(e) => setInputReceivedMessage(e.target.value)}
            placeholder="Enter Chart.."
          />
          <button
            type="submit"
            style={{
              width: "70px",
              color: "black",
              backgroundColor: "lightblue",
              padding: "1px",
              margin: "5px",
            }}
          >
            Received
          </button>
        </form>
        <p>Status: {isConnected ? "Connected" : "Connection lost"}</p>
        <TypingIndicator isTyping={isTyping} />
      </div>
    </div>
  );
};
