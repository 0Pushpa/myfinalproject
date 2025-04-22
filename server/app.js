import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import * as http from "http";
import webSockets from "./socket/index.js";
import compression from "compression";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import userRouter from "./routes/users.js";
import jobsRouter from "./routes/jobs.js";
import groupsRouter from "./routes/group.js";
import sectorsRouter from "./routes/sector.js";
import groupUsersRouter from "./routes/groupUser.js";
import groupSectorsRouter from "./routes/groupSector.js";
import dataStatsRouter from "./routes/dataStat.js";
import chatRouter from "./routes/chat.js";
import fileRouter from "./routes/file.js";

// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8080;
const CONNECTION_URL =
  "mongodb+srv://user1:wXrS4OTbpg9DzsxV@cluster0.4mjii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
  })
);
app.use(express.static("files"));

// Routes
app.use("/posts", jobsRouter);
app.use("/users", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/group", groupsRouter);
app.use("/api/sector", sectorsRouter);
app.use("/api/groupusers", groupUsersRouter);
app.use("/api/groupsectors", groupSectorsRouter);
app.use("/api/datastats", dataStatsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/file", fileRouter);

// Serve React static files (when deployed)
app.use(express.static(path.join(__dirname, "./build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

// WebSockets
io.on("connection", (socket) => {
  webSockets(io, socket);
});

// Error Handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Connect DB and Start Server
mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    httpServer.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
