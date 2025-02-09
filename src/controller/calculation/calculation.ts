import { ValidationError } from "@/global/errors/validationError";
import { badRequest, ok, serverError } from "@/helper/helper";
import { IBasesCalculation } from "@/interfaces/calculate";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { PricingService } from "@/service/calculation/pricing";
import { PricingCalculator } from "@/service/calculation/pricingCalculator";

export class CalculationDataProductWithouIngredientController
  implements IController
{
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown>> {
    try {
      if (!httpRequest.body) return badRequest("Nenhuma dado fornecido.");

      const datasToBasesCalculation = httpRequest.body;

      const pricingCalculator = new PricingCalculator();

      const pricingService = new PricingService(
        datasToBasesCalculation as IBasesCalculation,
        pricingCalculator
      );

      const datas = pricingService.calculate();

      return ok<IBasesCalculation>(datas);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        return badRequest(error.message);
      } else {
        return serverError();
      }
    }
  }
}
