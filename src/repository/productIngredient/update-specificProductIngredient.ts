import connection from "@/database/connectionKnex";
import { IUpdateProductIngredient, IUpdateSpecificProductIngredientRepository } from "@/interfaces/productIngredients";

export class MySqlUpdateSpecificProductIngredientRepository implements IUpdateSpecificProductIngredientRepository{
    async updateSpecificProductIngredientController(id_productIngredient: number, params: IUpdateProductIngredient): Promise<number> {
        try {
            const updatedProductIngredient = await connection.update(params).table('product_ingredients').where({id:id_productIngredient})
            
            return updatedProductIngredient
        } catch (error) {
            console.log(error);
            
            throw new Error('Product not update')
        }
    }

}