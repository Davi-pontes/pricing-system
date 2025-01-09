import {
  IEntryStock,
  IEntryStockRepository,
  IUpdateStockRepository,
} from "@/interfaces/stock";

export class StockEntryService {
  constructor(
    private readonly entryStockRepository: IEntryStockRepository,
    private readonly updateStockRepository: IUpdateStockRepository
  ) {}

  async addEntry(dataEntry: IEntryStock): Promise<IEntryStock> {
    await this.entryStockRepository.registerStockEntry(dataEntry);

    const updatedStock = await this.updateStockRepository.incrementStock(dataEntry);

    return updatedStock
  }
}
