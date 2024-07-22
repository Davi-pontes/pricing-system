import connection from "@/database/connectionKnex";
import { IGetAllProductIngredient, IProductIngredient } from "@/interfaces/productIngredients";

export class MySqlGetAllProductIngredientRepository implements IGetAllProductIngredient{
    async getAllProductIngredient(): Promise<IProductIngredient[]> {
        const allProduct = await connection
        .select('id','name','weight','unit1','price','quantity','unit2','ingredient_cost','id_product')
        .table('product_ingredients')
        .orderBy('name')

       return allProduct
    }

}