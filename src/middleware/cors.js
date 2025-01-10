import cors from 'cors';

const corseWhitelist =
  process.env.NODE_ENV === 'production'
    ? 'https://matejv.com'  // Only main domain for simplicity
    : 'http://localhost:3001';

const corsOptions = {
  origin: (origin, callback) => {
    console.log('New connection from:', origin);

    const isAllowed = origin && (origin === corseWhitelist || origin.endsWith('.matejv.com'));

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);