import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlGetProductRepository } from "@/repository/product/get-product";
import { MySqlGetSpecificProductIngredientRepository } from "@/repository/productIngredient/get-specificProductIngredient";
import { MySqlUpdateSpecificProductIngredientRepository } from "@/repository/productIngredient/update-specificProductIngredient";
import { UpdateProductComingIngredientController } from "../product/update-productComingIngredient";
import { MySqlGetIngredientByNameRepository } from "@/repository/productIngredient/get-ingredientByName";
import { GetDateAndHoursCurrent } from "@/generators/dateCurrent";

export class UpdateSpecificProductIngredientController implements IController {

    constructor(private readonly mySqlUpdateSpecificProducIngredientRepository: MySqlUpdateSpecificProductIngredientRepository) { }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            if (!httpRequest.body) return badRequest('Please specify a body')

            const {changeInformation, idUser} = httpRequest.body

            // const getSpecificProductIngredient = new MySqlGetSpecificProductIngredientRepository()
            // // Get updated product
            // const ingredientPreviousProduct = await getSpecificProductIngredient.getSpecificProductIngredient(currentProductIngredient.id)

            //if (!ingredientPreviousProduct) return badRequest('Not possible updated product ingredient')

            const mySqlGetIngredientByNameRepository = new MySqlGetIngredientByNameRepository()
            // Get all products that have the ingredient
            const ingredientsInDataBaseByName = await mySqlGetIngredientByNameRepository.getIngredientByName(changeInformation.name,idUser)

            if (ingredientsInDataBaseByName.length === 0) return badRequest('Not possible updated product ingredient')

            const getProductRepository = new MySqlGetProductRepository()

            const updateProductsThatTheIngredientBelongsTo = new UpdateProductComingIngredientController(getProductRepository)
            // Updare numbers
            const updatedNumbersIngredient = await updateProductsThatTheIngredientBelongsTo.updateProduct(ingredientsInDataBaseByName, ingredientPreviousProduct, changeInformation.price)

            if (!updatedNumbersIngredient) return badRequest('Not possible updated product ingredient')

            updatedNumbersIngredient.updated_at = GetDateAndHoursCurrent.dateTime()

            const updateSpecificProductIngredient = await this.mySqlUpdateSpecificProducIngredientRepository.updateSpecificProductIngredientController(updatedNumbersIngredient.id, updatedNumbersIngredient)

            if (updateSpecificProductIngredient === 0) return badRequest('Not possible updated product ingredient')

            return ok<IProductIngredient>(ingredientPreviousProduct)

        } catch (error) {
            return serverError()
        }
    }
}