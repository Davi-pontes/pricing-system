import connection from "@/database/connectionKnex"
import { IGetSpecificProductIngredient, IProductIngredient } from "@/interfaces/productIngredients"

export class MySqlGetSpecificProductIngredientRepository implements IGetSpecificProductIngredient {
    async getSpecificProductIngredient(idProductIngredient: string): Promise<IProductIngredient> {
        const specifiProductIngredient = await connection.select('id', 'name', 'weight', 'unit1', 'price', 'quantity', 'unit2', 'ingredient_cost', 'id_product')
            .table('product_ingredients')
            .where({ id: idProductIngredient })

        return specifiProductIngredient[0]
    }
}