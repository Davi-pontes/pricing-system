import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("payment_method",(table) => {
        table.increments("id").primary()
        table.string("id_user", 20).notNullable()
        table.foreign("id_user").references("users.id").onDelete("CASCADE")
        table.enu("type", ['money', 'credit_card', 'debit_card', 'pix', 'ticket']).notNullable()
        table.float('tax').defaultTo(0)
        table.smallint('status').defaultTo(1)
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("payment_method")
}

