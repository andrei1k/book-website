import knexCreate, { Knex } from "knex";
import { Model } from "objection";
import config from "../../knexfile";

let knex: Knex;

beforeAll(async () => {
  knex = knexCreate(config.test);
  Model.knex(knex);

  await knex.migrate.latest()
})

beforeEach(async () => {
  await knex('comments').delete()
  await knex('books_genres').delete()
  await knex('genres').delete()
  await knex('read_books').delete()
  await knex('books').delete()
  await knex('users').delete()
})

afterAll(async () => {
  await knex.destroy()
})
