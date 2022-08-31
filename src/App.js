import { useState } from "react";
import "./App.css";
import Chat from "./Components/Chat";

function App() {

  const msgData = [{ }];
  const [message, setMessage] = useState(msgData);

  const addMessage = (messages) => {
    messages.id = message.length + 1
    setMessage([...message, messages]);
  };

  return (
    <div className="App">
      <Chat addMessage={addMessage} data={message} />
    </div>
  );
}

export default App;
