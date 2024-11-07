import cors from 'cors';

const corseWhitelist =
  process.env.NODE_ENV === 'production'
    ? ['https://mvanik.com', /https:\/\/.*\.mvanik\.com$/]
    : ['http://localhost:3001'];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('New connection from:', origin);
    if (origin && corseWhitelist.includes(origin)) {
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
