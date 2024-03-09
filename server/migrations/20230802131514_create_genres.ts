import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable("genres", t => {

    t.increments("id").primary();
    t.string("name").notNullable().unique();
    t.timestamps(false, true);

    t.index("name");
  })
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.dropTable("genres");
}

