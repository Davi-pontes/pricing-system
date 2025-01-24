import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IEntryStock } from "@/interfaces/stock";
import { MySqlEntryStockRepository } from "@/repository/stockProduct/entry-stock";
import { MySqlUpdateStockRepository } from "@/repository/stockProduct/update-stock";
import { StockEntryService } from "@/service/stock/entry-stock";

export class StockEntryController implements IController {
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown>> {
    try {
      const datas = httpRequest.body;

      const entryStockRepository = new MySqlEntryStockRepository();

      const stockRepository = new MySqlUpdateStockRepository();

      const entryService = new StockEntryService(
        entryStockRepository,
        stockRepository
      );

      const result = await entryService.addEntry(datas as IEntryStock);

      return ok<IEntryStock>(result)
    } catch (error) {
      return serverError();
    }
  }
}
