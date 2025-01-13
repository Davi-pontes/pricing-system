import { IGetOrderRepository, IGetOrderService, IOrder } from "@/interfaces/order";
import { MySqlGetOrderRepository } from "@/repository/order/get-order";
import { Date } from "@/utils/date";

export class GetOrderService implements IGetOrderService{
    constructor(private readonly getOrderRepository: IGetOrderRepository){}
    async getAllOrderByIdUserAndDay(idUser: string, date: Date): Promise<IOrder[]> {

       const dateFormated = Date.formatToYearMonthDay(date)
        
        const allOrder = await this.getOrderRepository.getAllOrderByIdUserAndDay(idUser,dateFormated)

        console.log(allOrder.length);
        return allOrder
    }

    async getAllOrderByIdUser(idUser: string): Promise<IOrder[]> {
        const allOrder = await this.getOrderRepository.getAllOrderByIdUser(idUser)
        
        console.log(allOrder);
        
        return allOrder
    }
}

const repository = new MySqlGetOrderRepository()

const service = new GetOrderService(repository)

service.getAllOrderByIdUserAndDay('axcWKKyLk', '2025-01-10')