import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlGetProductIngredientRepository } from "@/repository/productIngredient/get-ingredient";

export class GetProductIngredientByIdController implements IController{
    constructor(private readonly mySqlGetProductIngredientRepository: MySqlGetProductIngredientRepository) {}

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IProductIngredient[] | string>> {
        try {
            if(!httpRequest.params){
                return badRequest('Please specify a params')
            }

            const productsIngredients = await this.mySqlGetProductIngredientRepository.getProductIngredient(httpRequest.params.id)

            return ok<IProductIngredient[]>(productsIngredients)
            
        } catch (error) {
            return serverError()
        }
    }
}