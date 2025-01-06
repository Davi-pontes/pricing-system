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

            const { changeInformation, idUser } = httpRequest.body

            const mySqlGetIngredientByNameRepository = new MySqlGetIngredientByNameRepository()
            // Get all products that have the ingredient
            const ingredientsInDataBaseByName = await mySqlGetIngredientByNameRepository.getIngredientByName(changeInformation.name, idUser)

            if (ingredientsInDataBaseByName.length === 0) return badRequest('Not possible updated product ingredient')

            const getProductRepository = new MySqlGetProductRepository()

            const updateProductsThatTheIngredientBelongsTo = new UpdateProductComingIngredientController(getProductRepository)
            // Update numbers
            const updatedNumbersIngredient = await updateProductsThatTheIngredientBelongsTo.updateProduct(ingredientsInDataBaseByName, ingredientsInDataBaseByName[0], changeInformation.price)

            if (!updatedNumbersIngredient) return badRequest('Not possible updated product ingredient')

            const updateDateAndTime = GetDateAndHoursCurrent.dateTime()

            for(let ingredient of ingredientsInDataBaseByName){
                ingredient.ingredient_cost = updatedNumbersIngredient.updatedIngredientCost
                ingredient.price = changeInformation.price
                ingredient.updated_at = updateDateAndTime
                const updateSpecificProductIngredient = await this.mySqlUpdateSpecificProducIngredientRepository.updateSpecificProductIngredientController(ingredient.id, ingredient)
                if (updateSpecificProductIngredient === 0) return badRequest('Not possible updated product ingredient')
            }
        
            return ok<IProductIngredient>({updatedNumbersIngredient,updatedIngredient: changeInformation})

        } catch (error) {
            return serverError()
        }
    }
}