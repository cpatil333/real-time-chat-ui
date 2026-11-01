import { useState } from "react";

type ChatHeaderProps = {
  isConnected: boolean;
  handleConnectedToggle: () => void;
};

export const ChatHeader = ({
  isConnected,
  handleConnectedToggle,
}: ChatHeaderProps) => {
  const [isOnline, setIsOnline] = useState(true);

  const handleToggle = () => {
    setIsOnline((prevToggle) => !prevToggle);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        style={{
          width: "150px",
          padding: "3px",
          margin: "5px",
          outlineColor: "black",
          backgroundColor: "lightblue",
          border: "1px solid gray",
        }}
      >
        {isOnline ? "Online" : "Offline"}
      </button>
      <button
        onClick={handleConnectedToggle}
        style={{
          width: "150px",
          padding: "3px",
          margin: "5px",
          outlineColor: "black",
          backgroundColor: "lightblue",
          border: "1px solid gray",
        }}
      >
        {isConnected ? "Simulate Disconnect" : "Reconnect"}
      </button>
    </div>
  );
};
