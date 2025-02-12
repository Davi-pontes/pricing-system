import connection from "@/database/connectionKnex";
import { IGetProductRepository, IProduct } from "@/interfaces/product";

export class MySqlGetProductRepository implements IGetProductRepository {
  async getProduct(user_id: string): Promise<IProduct[]> {
    try {
      const allProduct = await connection
        .select(
          "p.id_product",
          "p.name",
          "p.income",
          "p.recipe_time",
          "p.profit_percentage",
          "p.revenue_cost",
          "p.fixed_cost",
          "p.labor",
          "p.profit",
          "p.final_recipe_price",
          "p.price_per_unit",
          "p.operacional_cost",
          "p.cost_of_all_ingredients",
          "p.is_joker",
          "p.id_category",
          "p.only"
        )
        .from("category as c")
        .rightJoin("product as p", "c.id", "p.id_category")
        .where("c.user_id", user_id)
        .orderBy("name");

      return allProduct;
    } catch (error) {
      throw new Error("Not possible get product.");
    }
  }

  async getProductById(id_product: string): Promise<IProduct> {
    try {
      const Product = await connection
        .select(
          "p.id_product",
          "p.name",
          "p.income",
          "p.recipe_time",
          "p.profit_percentage",
          "p.revenue_cost",
          "p.fixed_cost",
          "p.labor",
          "p.profit",
          "p.final_recipe_price",
          "p.price_per_unit",
          "p.operacional_cost",
          "p.cost_of_all_ingredients",
          "p.is_joker",
          "p.id_category",
          "p.freight",
          "p.tax",
          "p.description",
          "p.qtd_box",
          "s.quantity as qtdStock"
        )
        .from("product as p")
        .leftJoin("stock as s", "p.id_product", "s.id_product")
        .where("p.id_product", id_product);


      return Product[0];
    } catch (error) {
      throw new Error("Not possible get product only.");
    }
  }

  async getProductByIdCategory(id_category: string): Promise<IProduct[]> {
    try {
      const Product = await connection
        .select(
          "p.id_product",
          "p.name",
          "p.income",
          "p.recipe_time",
          "p.profit_percentage",
          "p.revenue_cost",
          "p.fixed_cost",
          "p.labor",
          "p.profit",
          "p.final_recipe_price",
          "p.price_per_unit",
          "p.operacional_cost",
          "p.cost_of_all_ingredients",
          "p.is_joker",
          "p.id_category",
          "p.only"
        )
        .table("product as p")
        .where({ id_category });

      return Product;
    } catch (error) {
      throw new Error("Not possible get product.");
    }
  }

  async getProductJoker(user_id: string): Promise<IProduct[] | null> {
    try {
      const Product = await connection
        .select(
          "p.id_product",
          "p.name",
          "p.income",
          "p.recipe_time",
          "p.profit_percentage",
          "p.revenue_cost",
          "p.fixed_cost",
          "p.labor",
          "p.profit",
          "p.final_recipe_price",
          "p.price_per_unit",
          "p.operacional_cost",
          "p.cost_of_all_ingredients",
          "p.is_joker",
          "p.id_category"
        )
        .from("category as c")
        .rightJoin("product as p", "c.id", "p.id_category")
        .where("c.user_id", user_id)
        .where({ is_joker: 1 })
        .orderBy("name");

      return Product;
    } catch (error) {
      throw new Error("Not possible get product.");
    }
  }
}
