import { ICreateOrderItemsRepository, IOrderItems, IOrderItemsParams } from "@/interfaces/orderItems";
import connection from "@/database/connectionKnex";

export class MySqlCreateOrderItemsRepository implements ICreateOrderItemsRepository{
    async createOrderItems(params: IOrderItemsParams): Promise<any> {
        try {
            await connection.insert(params).table("order_items")

            const itemsOrder = await connection.select<IOrderItems>().table("order_items").where("id_order", params.id_order)

            return itemsOrder
        } catch (error) {
            throw new Error("Not created order items.");
        }
    }

}