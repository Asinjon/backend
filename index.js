import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: process.env.frontend,
    }
});
app.use(express.static(__dirname + "/public"));
app.use("/", (req, res) => {
    res.send("<h2>Hello from server!</h2>");
});

io.on("connection", socket => {
    console.log("socket.id: " + socket.id);
});

mongoose.connect(
    process.env.mongo_db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        httpServer.listen(process.env.PORT || 4000, () => console.log("Server is listening on port " + (process.env.PORT || 4000)));
    });
