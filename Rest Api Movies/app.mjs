import express from 'express';
import movies from './movies.json' assert { type: 'json' };
import crypto from 'node:crypto';
import { validateMovie } from './movies.mjs';
import { validatePartialMovie } from './movies.mjs';

const app = express();
const PORT = process.env.PORT ?? 1234;

app.disable('x-powered-by');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello my friend</h1>');
});

app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filterMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() == genre.toLowerCase())
    );
    return res.json(filterMovies);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id == id);
  if (movie) return res.json(movie);
  res.status(404).send('MOVIE NOT FOUND :(');
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie Not Found' });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;
  return res.json(updateMovie);
});

app.listen(PORT, () => {
  console.log(`server listening on port: http://localhost:${PORT}`);
});
