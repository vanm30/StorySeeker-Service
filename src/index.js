import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { handleWebSocketConnection } from './websocket/ws-router.js';

const app = express();
const server = createServer(app);
const port = 8080;

const wss = new WebSocketServer({ server: server });

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

wss.on('connection', handleWebSocketConnection);

app.get('/health', (res) => {
  res.status(200).send('Server is running...');
});
