import connection from "@/database/connectionKnex"
import { IProductIngredient, IUpdateProductIngredient, IUpdateStockRepository } from "@/interfaces/productIngredients";

export class MySqlUpdateStockRepository implements IUpdateStockRepository{
    async updateStock(id_productIngredient: number, params: IUpdateProductIngredient): Promise<number> {
        const updatedStock = await connection.update(params)
        .table('product_ingredients')
        .where({id: id_productIngredient})

        return updatedStock
    }
}