import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().min(0),
  poster: z.string().url(),
  rate: z.number().min(0).max(10).default(5),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
    ])
  ),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}

export function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object);
}
