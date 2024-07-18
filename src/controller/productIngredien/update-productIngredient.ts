import { IProductIngredient, IUpdateProductIngredientController, ICreateProductIngredientParams } from "@/interfaces/productIngredients";
import { MySqlCreateProductIngredientRepository } from "@/repository/productIngredient/create-productIngredient";
import { MySqlDeleteProductIngredientRepository } from "@/repository/productIngredient/delete-productIngredient";
import { CreateProductIngredientController } from "./create-productIngredient";

export class UpdateProductIngredientController implements IUpdateProductIngredientController{
    constructor(private readonly mySqlDeleteProductIngredientRepository: MySqlDeleteProductIngredientRepository) {}
    
    async updateProductIngredientController(id_product: string, params: ICreateProductIngredientParams[]): Promise<IProductIngredient> {
        try {

            const deleteProductIngredient = await this.mySqlDeleteProductIngredientRepository.deleteProductIngredient(id_product)

            const mySqlCreateProductIngredientRepository = new MySqlCreateProductIngredientRepository()

            const createProductIngredientRepository = new CreateProductIngredientController(mySqlCreateProductIngredientRepository)

            const productIngredientCreated = await createProductIngredientRepository.handle(params,id_product)

            if(!productIngredientCreated) throw new Error("Product ingredient not atualized");

            return productIngredientCreated
        } catch (error) {
            throw new Error("Product ingredient not atualized");
            
        }
    }

}