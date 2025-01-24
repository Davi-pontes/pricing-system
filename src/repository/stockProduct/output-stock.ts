import { IOutPutStock, IOutPutStockRepository } from "@/interfaces/stock";
import connection from "@/database/connectionKnex";

export class MySqlOutPutStockRepository implements IOutPutStockRepository{
    async registerOutPutStock(params: IOutPutStock): Promise<any> {
        try {
            const result = await connection
            .insert(params)
            .table('product_output_stock')

            return result
        } catch (error) {
            console.log(error);
            
            throw new Error("Not register entry into stock.")
        }
    }
}