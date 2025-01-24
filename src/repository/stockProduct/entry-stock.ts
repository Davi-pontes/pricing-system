import { IEntryStock, IEntryStockRepository } from "@/interfaces/stock";
import connection from "@/database/connectionKnex";

export class MySqlEntryStockRepository implements IEntryStockRepository{
    async registerStockEntry(params: IEntryStock): Promise<any> {
        try {
            const result = await connection
            .insert(params)
            .table('product_stock_entry')

            return result
        } catch (error) {
            throw new Error("Not register entry into stock.")
        }
    }
    
}