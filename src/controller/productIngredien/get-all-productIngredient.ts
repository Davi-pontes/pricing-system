import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpResponse } from "@/interfaces/http";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlGetAllProductIngredientRepository } from "@/repository/productIngredient/get-all-ingredient";

export class GetAllProductIngredientController implements IController {
    constructor(private readonly mySqlGetAllProductIngredientRepository: MySqlGetAllProductIngredientRepository) { }

    async handle(): Promise<HttpResponse<IProductIngredient[] | string>> {
        try {
            const productsIngredients = await this.mySqlGetAllProductIngredientRepository.getAllProductIngredient()

            return ok<IProductIngredient[]>(productsIngredients)

        } catch (error) {
            return serverError()
        }
    }
}