import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('category',(table) => {
        table.string('id',20).primary()
        table.string('name',150).nullable()
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('category')
}

