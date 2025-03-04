import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("product_stock_entry", (table) => {
      table.increments("id").primary();
      table.integer("quantity").defaultTo(0);
      table.integer('id_stock').unsigned()
      table
        .foreign("id_stock")
        .references("stock.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTable("product_stock_entry")
  }
