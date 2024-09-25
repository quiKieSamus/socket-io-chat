import express from 'express';
import { dirname, join, parse } from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
/**
 * @type {express}
 */
const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

function filePath(fileName) {
    return join(__dirname, fileName);
}

function parseBody(req) {
    req.on("data", (msg) => req.body = msg.toString());
}

app.get("/", (req, res) => {
    res.sendFile(filePath("index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(filePath("login.html"));
});

app.post("/login", (req, res) => {
    parseBody(req);
    res.end();
});

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log(`message: ${msg}\n id: ${socket.id}`);
        socket.rooms.forEach((room) => {
            io.emit("new message", msg);
        })
    });
});

server.listen(3000, () => {
    console.log("app on port 3000");
});