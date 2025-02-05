import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (table) => {
        table.timestamp('first_access', {useTz:true}).defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('first_access')
    })
}

