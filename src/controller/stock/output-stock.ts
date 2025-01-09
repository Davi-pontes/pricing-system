import { ok, serverError, unprocessableEntity } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IOutPutStock } from "@/interfaces/stock";
import { MySqlGetStockRepository } from "@/repository/stock/get-byIdStock";
import { MySqlOutPutStockRepository } from "@/repository/stock/output-stock";
import { MySqlUpdateStockRepository } from "@/repository/stock/update-stock";
import { InsufficientStockError } from "@/service/stock/errors/insufficientStockError";
import { StockOutPutService } from "@/service/stock/output-stock";

export class StockOutPutController implements IController {
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown>> {
    try {
      const datas = httpRequest.body;

      const getStockRepository = new MySqlGetStockRepository();

      const outputStockRepository = new MySqlOutPutStockRepository();

      const updateStockRepository = new MySqlUpdateStockRepository();

      const outputService = new StockOutPutService(
        getStockRepository,
        outputStockRepository,
        updateStockRepository
      );

      const result = await outputService.addOutput(datas as IOutPutStock);

      return ok<any>(result);
    } catch (error) {
      if (error instanceof InsufficientStockError){
        return unprocessableEntity(error.message)
      }
      return serverError();
    }
  }
}
