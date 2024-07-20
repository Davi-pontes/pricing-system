import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlGetSpecificProductIngredientRepository } from "@/repository/productIngredient/get-specificProductIngredient";
import { MySqlUpdateSpecificProductIngredientRepository } from "@/repository/productIngredient/update-specificProductIngredient";

export class UpdateSpecificProductIngredientController implements IController {

    constructor(private readonly mySqlUpdateSpecificProducIngredientRepository: MySqlUpdateSpecificProductIngredientRepository) { }
    
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            if (!httpRequest.body) return badRequest('Please specify a body')

            const datasProductIngredient = httpRequest.body

            const updateSpecificProductIngredient = await this.mySqlUpdateSpecificProducIngredientRepository.updateSpecificProductIngredientController(datasProductIngredient.id, datasProductIngredient)

            if (updateSpecificProductIngredient === 0) {
                return badRequest('Not possible updated product ingredient')
            }
            const getSpecificProductIngredient = new MySqlGetSpecificProductIngredientRepository()

            const productIgredientUpdated = await getSpecificProductIngredient.getSpecificProductIngredient(datasProductIngredient.id)

            if (!productIgredientUpdated) {
                return badRequest('Not possible updated product ingredient')
            }

            return ok<IProductIngredient>(productIgredientUpdated)

        } catch (error) {
            return serverError()
        }
    }
}