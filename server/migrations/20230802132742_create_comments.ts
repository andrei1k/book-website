import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable("comments", t => {

    t.increments("id").primary();
    t.text("text").notNullable();
    t.integer("book_id").notNullable();
    t.integer("user_id").notNullable();
    t.timestamps(false, true);

    t.foreign("book_id").references("books.id");
    t.foreign("user_id").references("users.id");
  })
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.dropTable("comments");
}

