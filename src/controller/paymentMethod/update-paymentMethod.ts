import { ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlUpdatePaymentMethodRepository } from "@/repository/paymentMthod/update-paymentMethod";
import { UpdatePaymentMethodService } from "@/service/paymentMethod/update-paymentMethod";

export class UpdatePaymentMethodController implements IController {
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<unknown>> {
    try {
      const { paymentMethods } = httpRequest.body;
      const idUser = httpRequest.params.idUser;
      const updatePaymentMethodRepository =
        new MySqlUpdatePaymentMethodRepository();

      const updatePaymentMethodService = new UpdatePaymentMethodService(
        updatePaymentMethodRepository
      );

      const result = await updatePaymentMethodService.update(paymentMethods,idUser);

      return ok<any>(result)
    } catch (error) {
      return serverError();
    }
  }
}
