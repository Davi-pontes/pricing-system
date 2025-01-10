import {
  ICreateOrder,
  ICreateOrderRepository,
  ICreateOrderService,
  IOrder,
} from "@/interfaces/order";
import { MySqlGetStockRepository } from "@/repository/stock/get-byIdStock";
import { ValidateStock } from "../stock/validate-stock";

export class CreateOrderService implements ICreateOrderService {
  constructor(private readonly createOrderRepository: ICreateOrderRepository) {}

  async createOrder(params: ICreateOrder): Promise<IOrder> {
    try {
      const getStockRepository = new MySqlGetStockRepository();

      const validateStock = new ValidateStock(getStockRepository);

      await validateStock.validateStock(params.orderItems);
      
      const createdOrder = await this.createOrderRepository.createOrder(
        params.orderSummary
      );

      return createdOrder;
    } catch (error) {
        throw new Error("Not created order.")
    }
  }
}
