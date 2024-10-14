import express from 'express';
import corsOptions from './middlewares/corsOptions.js';
import limiter from './middlewares/rateLimiter.js';
import suggestionRoutes from './routes/suggestionRoutes.js';

const app = express();
const port = 8080;

//Set up express tools
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());

//Set up routes
app.use(suggestionRoutes);

server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
