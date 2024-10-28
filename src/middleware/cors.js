import cors from 'cors';

const corseWhitelist = ['https://storyseeker.mvanik.com'];

const corsOptions = {
  origin: (origin, callback) => {
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
