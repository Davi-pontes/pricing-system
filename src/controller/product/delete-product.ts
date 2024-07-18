import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IProduct } from "@/interfaces/product";
import { MySqlDeleteProductRepository } from "@/repository/product/delete-product";
import { DeleteProductIngredientController } from "../productIngredien/delete-productIngredient";
import { MySqlDeleteProductIngredientRepository } from "@/repository/productIngredient/delete-productIngredient";

export class DeleteProductController implements IController{
    constructor(private readonly mySqlDeleteProductRepository: MySqlDeleteProductRepository) {}
    
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IProduct | string>> {
        try {
            if(!httpRequest.params){
                return badRequest('Please specify a params')
            }
            const id_product = httpRequest.params.id

            const mySqlDeleteProductIngredientRepository = new MySqlDeleteProductIngredientRepository()

            const deleteProductIngredientController = new DeleteProductIngredientController(mySqlDeleteProductIngredientRepository)

            await deleteProductIngredientController.DeleteProductIngredientController(id_product)

            const deletedProduct = await this.mySqlDeleteProductRepository.deleteProduct(id_product)

            return ok<IProduct>(deletedProduct)
        } catch (error) {
            return serverError()
        }
    }

    
}