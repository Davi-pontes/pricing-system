import {
  ICreateStockProduct,
  ICreateStockRepository,
} from "@/interfaces/stock";

export class CreateStockService {
  constructor(private readonly createStockRepository: ICreateStockRepository) {}

  async create(stockData: ICreateStockProduct) {
    const inserted = await this.createStockRepository.createSctock({
      quantity: stockData.quantity,
      id_product: stockData.id_product,
    });

    return inserted;
  }
}
