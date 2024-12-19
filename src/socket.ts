import { Server } from "socket.io";
import prisma from "./config/db.config";

export function setupSocket(io: Server) {
  // io.use((socket, next) => {
  //   socket.handshake.headers
  // });

  io.on("connection", (socket) => {
    console.log("Socket connected...", socket.id);

    socket.on("joinRoom", (user1_id, user2_id) => {
      const room = [user1_id, user2_id].sort().join("_");
      socket.join(room);
    });

    socket.on("message", async (data) => {
      console.log("socket message data: ", data);
      const { room, message, sender_id, receiver_id } = data;
      const savedMessage = await prisma.message.create({
        data: {
          sender_id: sender_id,
          receiver_id: receiver_id,
          message: message,
        },
      });
      socket.to(room).emit("receive-message", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected...", socket.id);
    });
  });
}
