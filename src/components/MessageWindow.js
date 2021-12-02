import React, { useState } from "react";
import "./messageWindow.css";

const MessageWindow = ({ room }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");

  console.log(room.state.messages);

  room.state.messages.onAdd = ({ client, message }, key) => {
    const newMessage = { client, message };
    setChatMessages([...chatMessages, newMessage]);
  };

  chatMessages.length > 0 && console.log("ChatMessages", chatMessages);

  const renderMessages = () =>
    chatMessages.map((message, i) => (
      <div
        key={i}
        className={message.client === room.sessionId ? "me" : "user"}
      >
        {message.message}
      </div>
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    setInput("");
    room.send("message", input);
  };

  return (
    <div className="message-window">
      <div className="message-window__messages">{renderMessages()}</div>
      <form action="#" className="message-window__form" onSubmit={handleSubmit}>
        <input
          className="message-window__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        ></input>
      </form>
    </div>
  );
};

export default MessageWindow;
