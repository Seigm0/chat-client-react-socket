import React, { useEffect, useState } from "react";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  sendMessage,
} from "../socket/socket-client";

const Chat = () => {
  const rooms = ["1", "2", "3"];
  const [newRooms, setNewRooms] = useState([])
  const [room, setRoom] = useState("1");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("");
  const [usernameActive, setUsernameActive] = useState(false);

  useEffect(() => {
    initiateSocket(room);

    subscribeToChat((err, data) => {
      if (err) return;
      setChat((oldChats) => [data, ...oldChats]);
    });

    return () => {
      disconnectSocket();
    };

  }, [room]);

  return (
    <div>
      <h1>Write your name</h1>
      {
        !usernameActive ?
        <>
          <input
            type="text"
            name="username"
            
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUsernameActive(true)} disabled={usernameActive}>Send</button>
        </>
        : <h1>{username}</h1>
      }
      <h1>Room: {room}</h1>
      {newRooms.map((r, i) => (
        <button onClick={() => setRoom(r)} key={i}>
          {r}
        </button>
      ))}
      <h1>Live Chat:</h1>
      <input
        type="text"
        name="name"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage(room, message, username)}>Send</button>
      {chat.map((m, i) => (
        <div key={i}>
          <p>{m.roomId}</p>
          <p>{m.driverLocation.latitude}</p>
        </div>
      ))}
    </div>
  );
}
export default Chat;
