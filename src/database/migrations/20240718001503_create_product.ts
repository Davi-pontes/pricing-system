import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product',(table) => {
        table.string('id_product', 20).primary()
        table.string('name',150).notNullable()
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
        table.boolean('is_joker')
        table.string('id_category', 20)
        table.foreign('id_category')
            .references('category.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('product')
}

