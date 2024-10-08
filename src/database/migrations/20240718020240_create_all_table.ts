import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.transaction(async trx => {
        await trx.schema.createTableIfNotExists('category', (table) => {
            table.string('id', 20).primary()
            table.string('name', 150).nullable()
            table.timestamps(true, true)
        })

        await trx.schema.createTableIfNotExists('product', (table) => {
            table.string('id_product', 20).primary()
            table.string('name', 150).notNullable()
            table.float('income')
            table.float('recipe_time')
            table.float('profit_percentage')
            table.float('revenue_cost')
            table.float('fixed_cost')
            table.float('labor')
            table.float('profit')
            table.float('final_recipe_price')
            table.float('price_per_unit')
            table.float('operacional_cost')
            table.float('cost_of_all_ingredients')
            table.boolean('is_joker')
            table.string('id_category', 20)
            table.foreign('id_category')
                .references('category.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.timestamps(true, true)
        })

        await trx.schema.createTableIfNotExists('product_ingredients', (table) => {
            table.increments('id').primary()
            table.string('name', 150).notNullable()
            table.float('weight')
            table.string('unit1', 45)
            table.float('price')
            table.float('quantity')
            table.string('unit2', 45)
            table.float('ingredient_cost')
            table.string('id_product', 20)
            table.integer('quantity_in_stock')
            table.float('total_cash_in_stock')
            table.foreign('id_product')
                .references('product.id_product')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.timestamps(true, true)
        })
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.transaction(async trx => {
        await trx.schema.dropTableIfExists('category');
        await trx.schema.dropTableIfExists('product');
        await trx.schema.dropTableIfExists('product_ingredients');
    })
}

