import { IGetStockRepository, IStockProduct } from "@/interfaces/stock";
import connection from "@/database/connectionKnex";

export class MySqlGetStockRepository implements IGetStockRepository{
    
    async getById(idStock: number): Promise<IStockProduct> {
        try {
            const stock = await connection
            .select('id', 'quantity', 'id_product')
            .table('stock')
            .where({id: idStock})

            return stock[0]
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
}