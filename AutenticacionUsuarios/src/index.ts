import express from 'express';
import { PORT } from './config';
import userRouter from './routers/user.router';
import { connectDB } from './db/mongodb';
import errorController from './controllers/error/index.controller';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.get('/', (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.render('index'); // Si no hay token, redirigir a login
  try {
    const data = jwt.verify(token, 'secret');
    res.render('protected');
  } catch (error) {
    res.render('index');
  }
});
app.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.status(200).send();
});

async function main() {
  try {
    await connectDB();
    app.use('/user', userRouter);
    app.use(errorController);

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

main();
