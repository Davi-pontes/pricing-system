import { ICreateOrderParams, ICreateOrderRepository, IOrder } from "@/interfaces/order";
import connection from "@/database/connectionKnex";

export class MySqlCreateOrderRepository implements ICreateOrderRepository{
    async createOrder(params: ICreateOrderParams): Promise<IOrder> {
        try {
            const [insertedId] = await connection.insert(params).table("orders")

            const createdOrder = await connection.select(
                "id", 
                "discount", 
                "type_payment_method", 
                "tax", 
                "sub_total",
                "total",
                "id_user")
                .table("orders")
                .where("id", insertedId)

                return createdOrder[0]
        } catch (error) {
            throw new Error("Not created order.")
        }
    }

}