import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.alterTable("books", t => {

    t.dropNullable("user_id");
  })
}


export async function down(knex: Knex): Promise<void> {
  
  await knex.schema.alterTable("books", t => {
  
    t.setNullable("user_id");
  })
}

