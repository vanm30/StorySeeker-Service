import { createMessage } from '../utils/messageConstructor.js';
import { handleReceivedMessage } from './ws-handlers.js';

export function handleWebSocketConnection(ws, req) {
  const clientIP = req.socket.remoteAddress;
  console.log(`New WebSocket client connected from IP: ${clientIP}`);

  ws.send(createMessage('ACK', { message: 'Connection established' }));

  ws.on('message', (message) => {
    handleReceivedMessage(ws, message);
  });

  ws.on('close', () => {
    console.log(`WebSocket client disconnected from IP: ${clientIP}`);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
}
