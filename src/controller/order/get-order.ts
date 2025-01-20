import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IGetOrderController, IOrder } from "@/interfaces/order";
import { MySqlGetOrderRepository } from "@/repository/order/get-order";
import { GetOrderService } from "@/service/order/get-order";

export class GetOrderController implements IGetOrderController {
  async handleQueryIdUserAndDay(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<IOrder[] | string>> {
    try {
      const idUser = httpRequest.params.idUser;
      const day = httpRequest.params.day;

      const getOrderRepository = new MySqlGetOrderRepository();

      const getOrderService = new GetOrderService(getOrderRepository);

      const allOrderByIdUserAndDay =
        await getOrderService.getAllOrderByIdUserAndDay(idUser, day);

      return ok<IOrder[]>(allOrderByIdUserAndDay);

    } catch (error) {
      return serverError();
    }
  }
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<IOrder[] | string>> {
    try {
      const idUser = httpRequest.params.idUser;

      const getOrderRepository = new MySqlGetOrderRepository();

      const getOrderService = new GetOrderService(getOrderRepository);

      const allOrderByIdUser = await getOrderService.getAllOrderByIdUser(
        idUser
      );

      return ok<IOrder[]>(allOrderByIdUser);
      
    } catch (error) {
      return serverError();
    }
  }
}
