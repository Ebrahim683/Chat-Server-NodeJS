import express, { Request, Response } from "express";
import { json } from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import authRouter from "./routers/AuthRouter";
import usersRouter from "./routers/UsersRouter";
import { setupSocket } from "./socket";
import authMiddleware from "./middleware/AuthMiddleware";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

setupSocket(io);

export { io };

app.use(cors());
app.use(json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api", usersRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Node.js with TypeScript!");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
