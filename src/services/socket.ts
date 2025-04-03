import { io } from "socket.io-client";

export const socket = io(
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || "wss://localhost:8000"
);
