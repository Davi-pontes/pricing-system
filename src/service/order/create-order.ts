import {
  ICreateOrder,
  ICreateOrderRepository,
  ICreateOrderService,
  IOrder,
} from "@/interfaces/order";
import { MySqlGetStockRepository } from "@/repository/stock/get-byIdStock";
import { ValidateStock } from "../stock/validate-stock";
import { MySqlCreateOrderRepository } from "@/repository/order/create-order";
import { ValidationErrorOrder } from "@/service/order/errors/validationError";
import { ICreateOrderItems } from "@/interfaces/orderItems";
import { MySqlCreateOrderItemsRepository } from "@/repository/orderItems/create-orderItems";
import { CreateOrderItemsService } from "../orderItems/create-orderItems";
import { MySqlGetOrderRepository } from "@/repository/order/get-order";
import { GetOrderService } from "./get-order";
import { VCreateOrder } from "@/validations/order/create-order";

export class CreateOrderService implements ICreateOrderService {
  constructor(private readonly createOrderRepository: ICreateOrderRepository) {}

  async createOrder(params: ICreateOrder): Promise<IOrder> {
    try {
      const validate = await VCreateOrder.validateOrderParams(
        params.orderSummary
      );

      if (validate.error) {
        throw new ValidationErrorOrder(validate.message);
      }
      if (params.orderItems.length === 0) {
        throw new ValidationErrorOrder("Adicione 1 produto.");
      }
      const getStockRepository = new MySqlGetStockRepository();

      const validateStock = new ValidateStock(getStockRepository);

      const itemsApproved = await validateStock.validateStock(
        params.orderItems
      );

      const newOrderId = await this.createOrderRepository.createOrder(
        params.orderSummary
      );
      const assemblingDataSendOrCreateTheOrder: ICreateOrderItems[] =
        itemsApproved.map((order: IOrder) => {
          return { ...order, id_order: newOrderId };
        });

      const createOrderItemsRepository = new MySqlCreateOrderItemsRepository();

      const createOrderItemsService = new CreateOrderItemsService(
        createOrderItemsRepository
      );

      await createOrderItemsService.createOrderItems(
        assemblingDataSendOrCreateTheOrder
      );

      const getOrderRepository = new MySqlGetOrderRepository();

      const getOrderService = new GetOrderService(getOrderRepository);

      const orderCreated = await getOrderService.getOrderByIdOrder(newOrderId);

      return orderCreated;
    } catch (error) {
      if (error instanceof ValidationErrorOrder) {
        throw new ValidationErrorOrder(error.message);
      }

      throw new Error("Not created order.");
    }
  }
}
