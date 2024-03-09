import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  const promises: Promise<void>[] = [];

  promises.push(knex.schema.alterTable('books', t => {

    t.dropForeign("user_id");
    t.foreign("user_id").references("users.id").onDelete("CASCADE");
  }));

  promises.push(knex.schema.alterTable("books_genres", t => {

    t.dropForeign("book_id");
    t.dropForeign("genre_id");

    t.foreign("book_id").references("books.id").onDelete("CASCADE");
    t.foreign("genre_id").references("genres.id").onDelete("CASCADE");
  }));

  promises.push(knex.schema.alterTable("comments", t => {

    t.dropForeign("book_id");
    t.dropForeign("user_id");

    t.foreign("book_id").references("books.id").onDelete("CASCADE");
    t.foreign("user_id").references("users.id").onDelete("CASCADE");

  }));

  promises.push(knex.schema.alterTable("read_books", t => {

    t.dropForeign("book_id");
    t.dropForeign("user_id");

    t.foreign("book_id").references("books.id").onDelete("CASCADE");
    t.foreign("user_id").references("users.id").onDelete("CASCADE");

  }));

  await Promise.all(promises);
}


export async function down(knex: Knex): Promise<void> {

  const promises: Promise<void>[] = [];
  promises.push(knex.schema.alterTable('books', t => {

    t.dropForeign("user_id");
    t.foreign("user_id").references("users.id");
  }));

  promises.push( knex.schema.alterTable("books_genres", t => {

    t.dropForeign("book_id");
    t.dropForeign("genre_id");

    t.foreign("book_id").references("books.id");
    t.foreign("genre_id").references("genres.id");
  }))

  promises.push( knex.schema.alterTable("comments", t => {

    t.dropForeign("book_id");
    t.dropForeign("user_id");

    t.foreign("book_id").references("books.id");
    t.foreign("user_id").references("users.id");
  }))

  promises.push( knex.schema.alterTable("read_books", t => {

    t.dropForeign("book_id");
    t.dropForeign("user_id");

    t.foreign("book_id").references("books.id");
    t.foreign("user_id").references("users.id");
  }));

  await Promise.all(promises);
}

