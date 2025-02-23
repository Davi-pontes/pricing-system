import { ok, serverError } from "@/helper/helper";
import { IDashboard } from "@/interfaces/dashboard";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlGetProductRepository } from "@/repository/product/get-product";
import { DashboardService } from "@/service/dashboard/dashboard";

export class GetDataToDashboardController implements IController {
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const idUser = httpRequest.params.id

            const mySqlGetProductRepository = new MySqlGetProductRepository()

            const dashBoardService = new DashboardService(mySqlGetProductRepository)

            const allNumberToDashboard = await dashBoardService.assembleDatasToDashboard(idUser)

            return ok<IDashboard>(allNumberToDashboard)
        } catch (error) {
            return serverError()
        }
    }

}