import { IGetOrderRepository, IOrder } from "@/interfaces/order";
import connection from "@/database/connectionKnex";

export class MySqlGetOrderRepository implements IGetOrderRepository{
    async getOrderByIdOrder(idOrder: number): Promise<IOrder> {
        try {
            const allOrder = await connection
            .select("id","discount","type_payment_method","tax","sub_total","total","id_user","created_at")
            .table<IOrder>('orders')
            .where('id', idOrder)
            return allOrder[0]
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async getAllOrderByIdUserAndDay(idUser: string, date: string): Promise<IOrder[]> {
        try {
            const allOrder = await connection
            .select("id","discount","type_payment_method","tax","sub_total","total","id_user","created_at")
            .table<IOrder>('orders')
            .where('id_user', idUser)
            .andWhere('created_at', 'like', `${date}%`)

            return allOrder
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async getAllOrderByIdUser(idUser: string): Promise<IOrder[]> {
        try {
            const allOrder = await connection
            .select("id","discount","type_payment_method","tax","sub_total","total","id_user","created_at")
            .table<IOrder>('orders')
            .where('id_user', idUser)

            return allOrder
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

}