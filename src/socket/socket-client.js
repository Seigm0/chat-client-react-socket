import io from "socket.io-client";
import { driverLocation } from "../interfaces/travel";

let socket;

export const initiateSocket = async (travelId) => {
  
  if(!travelId) return console.log('no se encontro')
  socket = io("https://travel-socket.pol.guaodev.com");
  console.log(`Connecting socket...`);
  console.log("test",socket)
  if (socket) {
    console.log("first")
    console.log('travelId', travelId, socket)
    socket.emit("joinTravel", "travel-18-dslmri7P")
  };
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return true;
  socket.on("driverLocation", (msg) => {
    console.log("Websocket event received!");
    console.log('msg: ',msg)
    return cb(null, msg);
  });
};


export const sendMessage = (roomId , message,username) => {
  console.log("iqnwe",socket)
  if (socket) {
    const test = socket.emit("driverLocation", {  driverLocation, roomId: "travel-18-dslmri7P" });
    console.log(test)
  }
};
