import connection from "@/database/connectionKnex";
import { IGetAllProductIngredient, IProductIngredient } from "@/interfaces/productIngredients";

export class MySqlGetAllProductIngredientRepository implements IGetAllProductIngredient {
    async getAllProductIngredient(idUser: string): Promise<IProductIngredient[]> {
        const allProduct = await connection
            .select('pi.*')
            .from('category as c')
            .rightJoin('product as p', 'c.id', 'p.id_category')
            .rightJoin('product_ingredients as pi', 'p.id_product', 'pi.id_product')
            .where('c.user_id', idUser)
            .orderBy('name')

        return allProduct
    }

}