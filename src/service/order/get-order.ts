import {
  IGetOrderRepository,
  IGetOrderService,
  IOrder,
} from "@/interfaces/order";
import { CustomDateUtils } from "@/utils/date";

export class GetOrderService implements IGetOrderService {
  constructor(private readonly getOrderRepository: IGetOrderRepository) {}

  async getOrderByIdOrder(idOrder: number): Promise<IOrder> {
    const order = await this.getOrderRepository.getOrderByIdOrder(idOrder)

    order.created_at = CustomDateUtils.formatToTableFrontEnd(order.created_at)

    return order
  }

  async getAllOrderByIdUserAndDay(
    idUser: string,
    date: string
  ): Promise<IOrder[]> {
    const dateFormated = CustomDateUtils.formatToYearMonthDay(date);

    const allOrder = await this.getOrderRepository.getAllOrderByIdUserAndDay(
      idUser,
      dateFormated
    );

    const formatEveryDayForAllOrders = allOrder.map((it) => {
      return {
        ...it,
        created_at: CustomDateUtils.formatToTableFrontEnd(it.created_at),
      };
    });
    
    return formatEveryDayForAllOrders;
  }

  async getAllOrderByIdUser(idUser: string): Promise<IOrder[]> {
    const allOrder = await this.getOrderRepository.getAllOrderByIdUser(idUser);

    const formatEveryDayForAllOrders = allOrder.map((it) => {
        return {
          ...it,
          created_at: CustomDateUtils.formatToTableFrontEnd(it.created_at),
        };
      });

    return formatEveryDayForAllOrders;
  }
}
