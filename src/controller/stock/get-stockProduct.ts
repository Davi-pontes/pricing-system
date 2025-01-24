import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IStockProduct } from "@/interfaces/stock";
import { MySqlGetStockRepository } from "@/repository/stockProduct/get-stock";
import { GetStockProductService } from "@/service/stock/get-stockProduct";

export class GetStockProductController implements IController{
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const idUser = httpRequest.params.idUser
            
            if(!idUser) return badRequest('Id usuário é obrigatorio.')

            const getStockProductRepository = new MySqlGetStockRepository()
            
            const getStockProducService = new GetStockProductService(getStockProductRepository)

            const allStockProduct = await getStockProducService.getStockProductByIdUser(idUser)

            return ok<IStockProduct[]>(allStockProduct)
        } catch (error) {
            return serverError()
        }
    }

}