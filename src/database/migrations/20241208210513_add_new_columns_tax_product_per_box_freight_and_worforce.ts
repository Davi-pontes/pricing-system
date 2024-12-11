import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('product', (table) => {
        table.float('tax').defaultTo(0)
        table.float('freight').defaultTo(0)
        table.float('workforce').defaultTo(0)
        table.integer('qtd_box').defaultTo(0)

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('product', (table) => {
        table.dropColumn('user_id')
        table.dropColumn('tax')
        table.dropColumn('freight')
        table.dropColumn('workforce')
        table.dropColumn('qtd_box')
    });
}

