import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", t => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.string("email").notNullable().unique();
    t.timestamps(false, true);

    t.index("email");
  })
}


export async function down(knex: Knex): Promise<void> {
  
  await knex.schema.dropTable("users");
}

