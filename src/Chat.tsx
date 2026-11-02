import { useState, useEffect, useRef } from "react";
import { ChatType } from "./types/chat.type";
import { message } from "./data/message";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { ChatHeader } from "./components/ChatHeader";

export const Chat = () => {
  const [chatMessage, setChatMessage] = useState<ChatType[]>(message);
  const [isConnected, setIsConnected] = useState(false);
  const [hasLoadedPrevious, setHasLoadedPrevious] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const clientIdRef = useRef(crypto.randomUUID());

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socketRef.current = socket;

    //open connection
    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      //console.log("Received from server:", event.data);
      const receivedMessage = JSON.parse(event.data);

      const sender =
        receivedMessage.senderId === clientIdRef.current ? "me" : "other";

      setChatMessage((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          senderId: receivedMessage.senderId,
          sender: sender,
          text: receivedMessage.text,
          timestamp: Date.now(),
        },
      ]);
    };

    //close connection
    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleConnectedToggle = () => {
    setIsConnected((prevConnected) => !prevConnected);
  };

  const handleSendMessage = (text: string) => {
    if (text.trim() === "") return;

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          senderId: clientIdRef.current,
          text: text,
        }),
      );
    }
  };

  const handleReceivedMessage = (text: string) => {
    if (text.trim() === "") return;

    setChatMessage((prevSend) => [
      ...prevSend,
      {
        id: crypto.randomUUID(),
        senderId: clientIdRef.current,
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
        id: "-2",
        senderId: clientIdRef.current,
        sender: "other",
        text: "Hi",
        timestamp: message[0].timestamp - 120000,
      },
      {
        id: "-1",
        senderId: clientIdRef.current,
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
