import {
  IEntryStock,
  IOutPutStock,
  IUpdateStockRepository,
} from "@/interfaces/stock";
import connection from "@/database/connectionKnex";
import { IOrderItemsParams } from "@/interfaces/orderItems";

export class MySqlUpdateStockRepository implements IUpdateStockRepository {
  async incrementStock(params: IEntryStock): Promise<IEntryStock> {
    try {
      await connection
        .increment("quantity", params.quantity)
        .update({
          updated_at: connection.fn.now(),
        })
        .table("stock")
        .where("id", params.id_stock);

      const updatedStock = await connection
        .select("id", "quantity", "id_product", "updated_at")
        .table("stock")
        .where({ id: params.id_stock });

      return updatedStock[0]
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
  async decrementStock(params: IOutPutStock): Promise<IOutPutStock> {
    try {
      await connection
        .decrement("quantity", params.quantity)
        .update({
          updated_at: connection.fn.now(),
        })
        .table("stock")
        .where("id", params.id_stock);

      const updatedStock = await connection
        .select("id", "quantity", "id_product", "updated_at")
        .table("stock")
        .where({ id: params.id_stock });

      return updatedStock[0]
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
  async decrementStockByProduct(params: IOrderItemsParams): Promise<IOutPutStock> {
    try {
      await connection
        .decrement("quantity", params.quantity)
        .update({
          updated_at: connection.fn.now(),
        })
        .table("stock")
        .where("id", params.id_product);

      const updatedStock = await connection
        .select("id", "quantity", "id_product")
        .table("stock")
        .where({ id: params.id_product });

      return updatedStock[0]
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
