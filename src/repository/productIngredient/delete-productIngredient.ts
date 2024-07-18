import connection from "@/database/connectionKnex";
import { IDeleteProductIngredientRepository, IProductIngredient } from "@/interfaces/productIngredients";

export class MySqlDeleteProductIngredientRepository implements IDeleteProductIngredientRepository{
    
    async deleteProductIngredient(id_product: string): Promise<IProductIngredient> {
        try {
            const productIngredient = await connection.select('*').table('product_ingredients').where({ id_product })

            await connection('product_ingredients').where({ id_product }).del()

            return productIngredient[0]
        } catch (error) {
            console.log(error);
            
           throw new Error('Product ingredient not deleted') 
        }
    }

}