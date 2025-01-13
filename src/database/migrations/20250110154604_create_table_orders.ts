import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", (table) => {
        table.increments("id").primary()
        table.float("discount").defaultTo(0)
        table.string("type_payment_method",50)
        table.float("tax").defaultTo(0)
        table.float("sub_total").notNullable()
        table.float("total").notNullable()
        table.string("id_user", 20).notNullable()
        table.foreign("id_user").references("users.id").onDelete("CASCADE")
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("orders")
}

