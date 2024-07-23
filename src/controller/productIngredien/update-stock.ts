import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlGetSpecificProductIngredientRepository } from "@/repository/productIngredient/get-specificProductIngredient";
import { MySqlUpdateStockRepository } from "@/repository/productIngredient/update-stock";

export class UpdateStockController implements IController {
    constructor(private readonly mySqlUpdateStockRepository: MySqlUpdateStockRepository) { }

    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            if (!httpRequest.body) return badRequest('Please specify a body')

            const datasTheStock = httpRequest.body

            const formatedDatas = {
                id: datasTheStock.id,
                quantity_in_stock: datasTheStock.quantity_in_stock,
                total_cash_in_stock: datasTheStock.total_cash_in_stock
            }

            const updatedStock = await this.mySqlUpdateStockRepository.updateStock(formatedDatas.id, formatedDatas)

            if (updatedStock === 0) return badRequest('Not possible updated stock')

            const getSpecificProductIngredient = new MySqlGetSpecificProductIngredientRepository()

            const updatedProductIngredientStock = await getSpecificProductIngredient.getSpecificProductIngredient(formatedDatas.id)

            return ok<IProductIngredient>(updatedProductIngredientStock)
        } catch (error) {
            return serverError()
        }
    }

}