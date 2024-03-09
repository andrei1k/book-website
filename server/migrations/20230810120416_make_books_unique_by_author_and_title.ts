import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.alterTable("books", t => {

    t.string("author").notNullable().defaultTo("unknown");
    t.unique(["author", "title"]);
  })
}


export async function down(knex: Knex): Promise<void> {

  await knex.schema.alterTable("books", t => {

    t.dropUnique(["author", "title"]);
    t.dropColumn("author");
  })
}

