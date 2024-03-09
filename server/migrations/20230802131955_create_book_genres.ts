import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

   await knex.schema.createTable("books_genres", t => {

    t.increments("id").primary();
    t.integer("book_id").notNullable();
    t.integer("genre_id").notNullable();
    t.timestamps(false, true);

    t.unique(["book_id", "genre_id"]);

    t.foreign("book_id").references("books.id");
    t.foreign("genre_id").references("genres.id");

    t.index("genre_id");
   }) 
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.dropTable("books_genres");
}

