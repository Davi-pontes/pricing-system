import {
  ICreateOrder,
  ICreateOrderRepository,
  ICreateOrderService,
  IOrder,
} from "@/interfaces/order";
import { MySqlGetStockRepository } from "@/repository/stock/get-byIdStock";
import { ValidateStock } from "../stock/validate-stock";
import { MySqlCreateOrderRepository } from "@/repository/order/create-order";
import { ICreateOrderItems } from "@/interfaces/orderItems";
import { MySqlCreateOrderItemsRepository } from "@/repository/orderItems/create-orderItems";
import { CreateOrderItemsService } from "../orderItems/create-orderItems";

export class CreateOrderService implements ICreateOrderService {
  constructor(private readonly createOrderRepository: ICreateOrderRepository) { }

  async createOrder(params: ICreateOrder): Promise<IOrder> {
    try {
      const getStockRepository = new MySqlGetStockRepository();

      const validateStock = new ValidateStock(getStockRepository);

      const itemsApproved = await validateStock.validateStock(params.orderItems);

      const createdOrder = await this.createOrderRepository.createOrder(
        params.orderSummary
      );
      const assemblingDataSendOrCreateTheOrder: ICreateOrderItems[] = itemsApproved.map((order: IOrder) => { return { ...order, id_order: createdOrder.id } })

      // console.log(itemsApproved);
      // console.log(createdOrder);
      console.log(assemblingDataSendOrCreateTheOrder);

      const createOrderItemsRepository = new MySqlCreateOrderItemsRepository()

      const createOrderItemsService = new CreateOrderItemsService(createOrderItemsRepository)

      const orderItemCreated = await createOrderItemsService.createOrderItems(assemblingDataSendOrCreateTheOrder)
      
      console.log(orderItemCreated);
      
      return createdOrder;
    } catch (error) {
      throw new Error("Not created order.")
    }
  }
}

const order = {
  orderSummary: {
    discount: 0,
    type_payment_method: "pix",
    tax: 0,
    sub_total: 100,
    total: 100,
    id_user: 'axcWKKyLk'
  },
  orderItems:
    [
      {
        quantity: 2,
        id_product: 'gEjm7gAsH'
      }
    ]

}
const repository = new MySqlCreateOrderRepository()

const service = new CreateOrderService(repository)

service.createOrder(order)