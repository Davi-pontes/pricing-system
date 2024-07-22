import connection from "@/database/connectionKnex"
import { IUpdateProductComingIngredient } from "@/interfaces/product";
import { IGetIngredientByName } from "@/interfaces/productIngredients";

export class MySqlGetIngredientByNameRepository implements IGetIngredientByName{
    async getIngredientByName(name: string): Promise<Array<IUpdateProductComingIngredient>> {
        const ids_products = await connection.select('id_product')
        .table('product_ingredients')
        .where({name: name})
        
        return ids_products
    }

}