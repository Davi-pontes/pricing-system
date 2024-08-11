import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('category', (table) => {
        table.string('user_id')
        table.foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('category', (table) => {
        table.dropForeign(['user_id'])
        table.dropColumn('user_id')
    });
}

