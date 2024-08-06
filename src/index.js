import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import {
  createMessage,
  parseMessage,
  compiledSchemas,
} from './utils/messageHandler.js';

const app = express();
const server = createServer(app);
const port = 8080;

const wss = new WebSocketServer({ server: server });

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

wss.on('connection', (ws, req) => {
  const clientIP = req.socket.remoteAddress;
  console.log(`New WebSocket client connected from IP: ${clientIP}`);

  ws.send(createMessage('ACK', { message: 'Connection established' }));

  ws.on('message', (message) => {
    const parsedMessage = parseMessage(message);

    if (!parseMessage) {
      console.error(`Error parsing incoming message: ${message}`);
      ws.send(
        createMessage('ERROR', {
          message: 'Error on server side: Invalid message format',
        })
      );
      return;
    }

    const { type } = parsedMessage;
    const validate = compiledSchemas[type];

    if (validate && !validate(parsedMessage)) {
      console.error(
        `Invalid message format for type ${type}: ${ajv.errorsText(
          validate.errors
        )}`
      );
      ws.send(createMessage('ERROR', { message: 'Invalid message format' }));
      return;
    }

    switch (type) {
      default:
        console.log(`Unknown message type: ${type}`);
        ws.send(
          createMessage('ERROR', { message: 'Unknown message type received' })
        );
    }
  });

  ws.on('close', () => {
    console.log(`WebSocket client disconnected from IP: ${clientIP}`);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('Server is running...');
});
