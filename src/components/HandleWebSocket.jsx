import React, { useEffect, useState } from "react";
import Toast from "./Toast";

const HandleWebSocket = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const ws = new WebSocket(
      `ws://localhost:8080/notifications?token=${token}`
    );

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      console.log(event.data);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <Toast
            key={index}
            message={message}
            setMessage={setMessages}
            messageType="Success"
          />
        ))}
      </ul>
    </div>
  );
};

export default HandleWebSocket;
