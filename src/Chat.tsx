import { useState, useEffect } from "react";
import { ChatType } from "./types/chat.type";
import { message } from "./data/message";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { ChatHeader } from "./components/ChatHeader";

export const Chat = () => {
  const [chatMessage, setChatMessage] = useState<ChatType[]>(message);
  const [isConnected, setIsConnected] = useState(true);
  const [hasLoadedPrevious, setHasLoadedPrevious] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    //open connection
    socket.onopen = () => {
      console.log("After connection:", socket.readyState);
    };

    //close connection
    socket.onclose = () => {
      console.log("Connection closed", socket.readyState);
    };
  }, []);

  const handleConnectedToggle = () => {
    setIsConnected((prevConnected) => !prevConnected);
  };

  const handleSendMessage = (text: string) => {
    if (text.trim() === "") return;

    setChatMessage((prevSend) => [
      ...prevSend,
      {
        id: Date.now(),
        sender: "me",
        text: text,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleReceivedMessage = (text: string) => {
    if (text.trim() === "") return;

    setChatMessage((prevSend) => [
      ...prevSend,
      {
        id: Date.now(),
        sender: "other",
        text: text,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleLoadPreviousMessages = () => {
    if (hasLoadedPrevious === true) {
      return;
    }

    const olderMessages: ChatType[] = [
      {
        id: -2,
        sender: "other",
        text: "Hi",
        timestamp: message[0].timestamp - 120000,
      },
      {
        id: -1,
        sender: "me",
        text: "Are you available?",
        timestamp: message[0].timestamp - 60000,
      },
    ];
    setChatMessage((prev) => [...olderMessages, ...prev]);
    setHasLoadedPrevious(true);
  };

  const sortedChatMessage = [...chatMessage].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  return (
    <div>
      <ChatHeader
        isConnected={isConnected}
        handleConnectedToggle={handleConnectedToggle}
      />
      <MessageInput
        isConnected={isConnected}
        onSendMessage={handleSendMessage}
        onReceivedMessage={handleReceivedMessage}
      />
      <button
        style={{
          width: "180px",
          color: hasLoadedPrevious ? "grey" : "black",
          backgroundColor: "lightblue",
          padding: "2px",
          margin: "5px",
        }}
        onClick={handleLoadPreviousMessages}
        disabled={hasLoadedPrevious}
      >
        Load Previous Messages
      </button>
      <MessageList messages={sortedChatMessage} />
    </div>
  );
};
