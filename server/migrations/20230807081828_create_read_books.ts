import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable("read_books", t => {

    t.increments("id").primary();
    t.integer("user_id").references("users.id").notNullable();
    t.integer("book_id").references("books.id").notNullable();
    t.timestamps(false, true);

    t.unique(["user_id", "book_id"]);

  })
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.dropTable("read_books");
}

