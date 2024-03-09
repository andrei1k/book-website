import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('books', t => {
    t.string('image')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('books', t => {
    t.dropColumn('image')
  })
}

