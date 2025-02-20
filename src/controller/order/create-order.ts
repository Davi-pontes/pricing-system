import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ICreateOrder, IOrder } from "@/interfaces/order";
import { MySqlCreateOrderRepository } from "@/repository/order/create-order";
import { CreateOrderService } from "@/service/order/create-order";
import { ValidationErrorOrder } from "@/service/order/errors/validationError";
import { InsufficientStockError } from "@/service/stock/errors/insufficientStockError";

export class CreateOrderController implements IController{
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const datas = httpRequest.body

            const createOrderRepository = new MySqlCreateOrderRepository()

            const createOrderService = new CreateOrderService(createOrderRepository)

            const orderCreated = await createOrderService.createOrder(datas as ICreateOrder)

            return ok<IOrder>(orderCreated)
        } catch (error) {
            if(error instanceof ValidationErrorOrder){
                return badRequest(error.message)
            }
            if(error instanceof InsufficientStockError){
                return badRequest(error.message)
            }
            return serverError()
        }
    }

}