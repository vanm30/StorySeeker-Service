import express from 'express';
import cors from './middleware/cors.js';
import limiter from './middleware/rateLimit.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import healthRoutes from './routes/helthRoutes.js'

const app = express();
const port = 8080;

//Set up express tools
app.use(cors);
app.use(limiter);
app.use(express.json());

//Set up routes
app.use(suggestionRoutes);
app.use(healthRoutes);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
