const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(cors());

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log("Server is listening on PORT:", PORT);
});

const io = socket(server);

io.on("connection", (client) => {
    console.log("connected to socket");

    client.on("beginPath", (data) => {
        // send data to all socket members
        io.sockets.emit("beginPath", data);
    });

    client.on("drawPath", (data) => {
        io.sockets.emit("drawPath", data);
    });

    client.on("undoRedo", (data) => {
        io.sockets.emit("undoRedo", data);
    });
});
