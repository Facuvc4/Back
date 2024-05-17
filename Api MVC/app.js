import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { moviesRouter } from './routes/movies.js';

const app = express();
const PORT = process.env.PORT ?? 1234;

app.disable('x-powered-by');
app.use(express.json());

app.use(corsMiddleware());

app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
