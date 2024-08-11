import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('users', (table) => {
        table.string('id', 20).primary()
        table.string('name',150).notNullable()
        table.string('phone_number',11).notNullable
        table.string('email',250)
        table.string('password',32)
        table.boolean('is_admin').defaultTo(true)
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

