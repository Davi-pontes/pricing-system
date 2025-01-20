import {
  ICreateOrderParams,
  ICreateOrderRepository,
  IOrder,
} from "@/interfaces/order";
import connection from "@/database/connectionKnex";

export class MySqlCreateOrderRepository implements ICreateOrderRepository {
  async createOrder(params: ICreateOrderParams): Promise<number> {
    try {
      const [insertedId] = await connection.insert(params).table("orders");

      return insertedId;
    } catch (error) {
      throw new Error("Not created order.");
    }
  }
}
