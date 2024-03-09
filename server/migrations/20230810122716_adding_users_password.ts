import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.alterTable("users", t => {

    t.string("password").notNullable();
    t.index(["password", "email"]);
  })
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.alterTable("users", t => {

    t.dropIndex(["password", "email"]);
    t.dropColumn("password");
  })
}

