import { IDeleteProductIngredientController, IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlDeleteProductIngredientRepository } from "@/repository/productIngredient/delete-productIngredient";

export class DeleteProductIngredientController implements IDeleteProductIngredientController{
    constructor(private readonly deleteProductIngredientRepository: MySqlDeleteProductIngredientRepository) {}
    
    async DeleteProductIngredientController(id_product: string): Promise<IProductIngredient> {
        try {
            if(!id_product){
                throw new Error('Product ingredient not deleted')
            }

            const productIngredient = await this.deleteProductIngredientRepository.deleteProductIngredient(id_product)
            
            return productIngredient 
        } catch (error) {
            throw new Error('Product ingredient not deleted')
        }
    }
}