import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import { createMessage } from './utils/messageConstructor.js';
import { handleGenerateSuggestion } from './utils/messageHandlers.js';
import { validateMessageFormat } from './utils/validators.js';

const app = express();
const server = createServer(app);
const port = 8080;

const userRequests = {};

app.use(cors());

app.use(express.json());

app.post('/suggestions', async (req, res) => {
  const message = req.body;
  const ip = req.ip;
  const currTime = Date.now();
  const LIMIT = 10;
  const LIMIT_PERIOD = 24 * 60 * 60 * 1000; //1 day

  if (!userRequests[ip]) {
    userRequests[ip] = { count: 1, lastRequest: currTime };
  } else {
    const userData = userRequests[ip];

    if (currTime - userData.lastRequest > LIMIT_PERIOD) {
      userData.count = 1;
      userData.lastRequest = currTime;
    } else {
      userData.count += 1;
    }

    if (userData.count > LIMIT) {
      return res.status(429).json(
        createMessage('ERROR', {
          message: 'User exceeded daily limit',
        })
      );
    }
  }

  console.log('User data for ip', ip, userRequests[ip]);

  const isValid = validateMessageFormat(message);

  if (!isValid) {
    return res
      .status(400)
      .json(
        createMessage('ERROR', { message: 'Message has incorrect format' })
      );
  }

  switch (message.type) {
    case 'REQUEST_GENERATE_SUGGESTION':
      await handleGenerateSuggestion(res, message);
      break;
    default:
      console.log(`Message type not handled: ${message.type}`);
      return res.status(400).json(
        createMessage('ERROR', {
          message: 'Unable to handle this message type',
        })
      );
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('Server is running...');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
