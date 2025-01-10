import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("order_items", (table) =>{
        table.increments("id").primary()
        table.integer("quantity").notNullable()
        table.integer("id_order").unsigned()
        table
        .foreign("id_order")
        .references("orders.id")
        .onDelete("CASCADE")
        table.string("id_product",20)
        table
        .foreign("id_product")
        .references("product.id_product")
        .onDelete("CASCADE")
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("order_items")
}

