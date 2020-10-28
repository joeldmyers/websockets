const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  console.log("A new client connected");
  ws.send("Welcome, New Client!");

  ws.on("message", function incoming(message) {
    console.log("received %s", message);

    // Broadcast
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  
  
});

app.get("/", (req, res) => res.send("Hello World"));

server.listen(3005, () => console.log("Listening on port 3005"));