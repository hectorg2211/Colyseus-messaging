import React, { useState, useEffect } from "react";
import "./messageWindow.css";

const MessageWindow = ({ room }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");

  console.log("ChatMessages", chatMessages);

  useEffect(() => {
    room?.onMessage("message", (message) => {
      console.log(message);
      setChatMessages([...chatMessages, message]);
    });
  }, [room, chatMessages]);

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
    setInput("");
    console.log(chatMessages);
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
