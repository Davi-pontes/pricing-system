import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('product', (table) => {
        table.boolean('only').defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('product', (table) => {
        table.dropColumn('only')
    })
}

