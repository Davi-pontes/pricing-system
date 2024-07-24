import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { CalculateStock } from "@/utils/calculate-stock";

export class CalculateStockController implements IController {
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
        try {
            const datas = httpRequest.body
            const calculatestockToPeriod = new CalculateStock(datas.allProducts,
                datas.allIngredients,
                datas.quantityDays)

            const updatedDatas = await calculatestockToPeriod.calculateStockToOnePeriod()

            return ok<any>(updatedDatas)
        } catch (error) {
            return serverError()
        }
    }

}