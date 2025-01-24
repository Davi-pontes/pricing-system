import { ICreateStockProduct, ICreateStockRepository } from "@/interfaces/stock";
import connection from "@/database/connectionKnex";

export class MySqlCreateStockRepository implements ICreateStockRepository{
    async createSctock(params: ICreateStockProduct): Promise<any> {
        try {
            const [insertedId] = await connection
            .insert(params)
            .table('stock')

            const insertedStock = await connection
            .select('id', 'quantity', 'id_product')
            .table('stock')
            .where({id: insertedId})

            return insertedStock
        } catch (error) {
          console.log(error);
          
            throw new Error("Method not implemented.");
        }
    }
}