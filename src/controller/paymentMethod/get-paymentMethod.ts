import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IPaymentMethod } from "@/interfaces/paymentMethod";
import { MySqlGetPaymentMethodRepository } from "@/repository/paymentMthod/get-paymentMethod";
import { GetPaymentMethodService } from "@/service/paymentMethod/get-paymentMethod";

export class GetPaymentMethodController implements IController{
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        try {
            const idUser = httpRequest.params.idUser

            if(!idUser || idUser === '') return badRequest("Expected id.")

            const getPaymentMethodRepository = new MySqlGetPaymentMethodRepository()

            const getPaymentMethodService = new GetPaymentMethodService(getPaymentMethodRepository)

            const allPaymentMethodByIdUser = await getPaymentMethodService.getByActiveUserId(idUser)

            return ok<IPaymentMethod>(allPaymentMethodByIdUser)
        } catch (error) {
            return serverError()
        }
    }

}