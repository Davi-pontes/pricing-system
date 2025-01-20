import {
  IEntryStock,
  IEntryStockRepository,
  IUpdateStockRepository,
} from "@/interfaces/stock";
import { CustomDateUtils } from "@/utils/date";

export class StockEntryService {
  constructor(
    private readonly entryStockRepository: IEntryStockRepository,
    private readonly updateStockRepository: IUpdateStockRepository
  ) {}

  async addEntry(dataEntry: IEntryStock): Promise<IEntryStock> {
    try {
      await this.entryStockRepository.registerStockEntry(dataEntry);
  
      const updatedStock = await this.updateStockRepository.incrementStock(dataEntry);

      if(updatedStock.updated_at) updatedStock.updated_at = CustomDateUtils.formatToTableFrontEnd(updatedStock.updated_at)
  
      return updatedStock
    } catch (error) {
      throw new Error('Not add entry.')
    }
  }
}
