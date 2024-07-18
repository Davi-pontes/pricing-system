import connection from "@/database/connectionKnex";
import { IGetProductIngredient, IProductIngredient } from "@/interfaces/productIngredients";

export class MySqlGetProductIngredientRepository implements IGetProductIngredient{
    async getProductIngredient(idProduct: string): Promise<IProductIngredient[]> {
        const allProduct = await connection.select('id','name','weight','unit1','price','quantity','unit2','ingredient_cost','id_product').table('product_ingredients').where({id_product: idProduct})

       return allProduct
    }

}