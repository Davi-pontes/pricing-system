import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_ingredients',(table) => {
        table.increments('id').primary()
        table.string('name',150).notNullable()
        table.float('weight')
        table.string('unit1', 45)
        table.float('price')
        table.float('quantity')
        table.string('unit2', 45)
        table.float('ingredient_cost')
        table.string('id_product', 20)
        table.foreign('id_product')
            .references('product.id_product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('product_ingredients')
}

