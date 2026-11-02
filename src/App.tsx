import { Chat } from "./Chat";

function App() {
  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        fontSize: "30px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h1>WebSocket Client Test</h1>;
      <Chat />
    </div>
  );
}

export default App;
