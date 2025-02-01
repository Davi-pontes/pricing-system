import connection from "@/database/connectionKnex";
import { ICreateProductIngredientRepository, IProductIngredient, ICreateProductIngredientParams } from "@/interfaces/productIngredients";

export class MySqlCreateProductIngredientRepository implements ICreateProductIngredientRepository{
    async createProductIngredient(params: ICreateProductIngredientParams[]): Promise<IProductIngredient> {
        try {
            const productIngredient = await connection.insert(params).table('product_ingredients').returning('id')

            if(productIngredient.length === 0){
                throw new Error("Produc ingradient not created");
            }
            const productIngredients = await connection.select('*').table('product_ingredients').where({id: productIngredient[0]})

            return productIngredients[0]
        } catch (error) {
            throw new Error("Product ingredient not created")
        }
    }

}