import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", t => {
    t.dropIndex(["password", "email"]);
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", t => {
    t.index(["password", "email"]);
  })
}

