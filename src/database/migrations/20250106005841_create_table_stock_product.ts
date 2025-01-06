import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stock", (table) => {
    table.increments("id").primary();
    table.integer("quantity").defaultTo(0);
    table.string('id_product', 20)
    table
      .foreign("id_product")
      .references("product.id_product")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("stock")
}