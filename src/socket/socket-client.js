import io from "socket.io-client";
let socket;

export const initiateSocket = (room) => {
  socket = io("http://192.168.1.47:3000");
  console.log(`Connecting socket...`);
  if (socket && room) {
    console.log('room', room, socket)
    socket.emit("join", room)
  };
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return true;
  socket.on("msg", (msg) => {
    console.log("Websocket event received!");
    console.log('msg: ',msg)
    return cb(null, msg);
  });
};


export const sendMessage = (room, message) => {
  if (socket) socket.emit("msg", { message, room, username:'SelimTest' });
};
