import connection from "@/database/connectionKnex";
import { IGetAllProductIngredient, IProductIngredient } from "@/interfaces/productIngredients";

export class MySqlGetAllProductIngredientRepository implements IGetAllProductIngredient{
    async getAllProductIngredient(): Promise<IProductIngredient[]> {
        const allProduct = await connection
        .select('*')
        .table('product_ingredients')
        .orderBy('name')

       return allProduct
    }

}