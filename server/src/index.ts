import Knex from 'knex'
import { config } from '../knexfile';
import { Model } from 'objection';
import express from 'express';
import { json } from 'express';
import { bookRouter } from './routers/BookRouter';
import { userRouter } from './routers/UserRouter';
import { commentRouter } from './routers/CommentRoute';
import { genreRouter } from './routers/GenreRoute';
import { authRouter } from './routers/AuthRoot';
import cors from 'cors'

export const knex = Knex(config.development)
Model.knex(knex);

const app = express();
const port = 3000;

app.use(cors())
app.use(json());


app.use('/comments', commentRouter);
app.use('/auth', authRouter)
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/genres', genreRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});