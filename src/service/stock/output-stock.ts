import {
  IGetStockRepository,
  IOutPutStock,
  IOutPutStockRepository,
  IUpdateStockRepository,
} from "@/interfaces/stock";
import { InsufficientStockError } from "./errors/insufficientStockError";
import { ICreateOrderItems } from "@/interfaces/orderItems";

export class StockOutPutService {
  constructor(
    private readonly getStockRepository: IGetStockRepository,
    private readonly stockOutputRepository: IOutPutStockRepository,
    private readonly updateStockRepository: IUpdateStockRepository
  ) { }

  async addOutput(dataOutput: ICreateOrderItems): Promise<IOutPutStock> {
    const stock = await this.getStockRepository.getById(dataOutput.id_stock);

    if (!stock || stock.quantity < dataOutput.quantity) {
      throw new InsufficientStockError("Insufficient stock for output");
    }

    await this.stockOutputRepository.registerOutPutStock({ quantity: dataOutput.quantity, id_stock: dataOutput.id_stock });

    const updatedStock = await this.updateStockRepository.decrementStock(
      { quantity: dataOutput.quantity, id_stock: dataOutput.id_stock }
    );

    return updatedStock
  }
  async addOutputByProduct(dataOutput: IOutPutStock): Promise<IOutPutStock> {
    // const stock = await this.getStockRepository.getById(dataOutput.id_stock);

    // if (!stock || stock.quantity < dataOutput.quantity) {
    //   throw new InsufficientStockError("Insufficient stock for output");
    // }

    await this.stockOutputRepository.registerOutPutStock(dataOutput);

    const updatedStock = await this.updateStockRepository.decrementStock(
      dataOutput
    );

    return updatedStock
  }
}
