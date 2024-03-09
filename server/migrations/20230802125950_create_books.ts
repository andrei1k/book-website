import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable("books", t => {

    t.increments("id").primary();
    t.integer("user_id");
    t.string("title").notNullable();
    t.timestamps(false, true);

    t.foreign("user_id").references("users.id");

    t.index("title");
    t.index("user_id");
  })
}


export async function down(knex: Knex): Promise<void> {
  
  await knex.schema.dropTable("books")
}

