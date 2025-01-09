import {
  IGetStockRepository,
  IOutPutStock,
  IOutPutStockRepository,
  IUpdateStockRepository,
} from "@/interfaces/stock";
import { InsufficientStockError } from "./errors/insufficientStockError";

export class StockOutPutService {
  constructor(
    private readonly getStockRepository: IGetStockRepository,
    private readonly stockOutputRepository: IOutPutStockRepository,
    private readonly updateStockRepository: IUpdateStockRepository
  ) {}

  async addOutput(dataOutput: IOutPutStock): Promise<IOutPutStock> {
    const stock = await this.getStockRepository.getById(dataOutput.id_stock);

    if (!stock || stock.quantity < dataOutput.quantity) {
      throw new InsufficientStockError("Insufficient stock for output");
    }

    await this.stockOutputRepository.registerOutPutStock(dataOutput);

    const updatedStock = await this.updateStockRepository.decrementStock(
      dataOutput
    );

    return updatedStock
  }
}
