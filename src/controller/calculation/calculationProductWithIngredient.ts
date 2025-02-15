import { badRequest, ok, serverError } from "@/helper/helper";
import {
  IBasesCalculationProductWithIngredient,
  ICalculationResultProductWithIngredient,
} from "@/interfaces/calculate";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { PricingProductWithIngredientCalculator } from "@/service/calculation/pricingProductWithIngredientCalculator";
import { PricingProductWithIngredientService } from "@/service/calculation/princingProductWithIngredient";

export class CalculationDataProductWitIngredientController
  implements IController
{
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown>> {
    try {
      if (!httpRequest.body) return badRequest("Nenhum dado fornecido.");

      const datasToBasesCalculation = httpRequest.body;

      const pricingCalculatorProductIngredient =
        new PricingProductWithIngredientCalculator();

      const pricingProductWithIngredientService =
        new PricingProductWithIngredientService(
          datasToBasesCalculation as IBasesCalculationProductWithIngredient,
          pricingCalculatorProductIngredient
        );
      const calculationResult = pricingProductWithIngredientService.calculate();

      return ok<ICalculationResultProductWithIngredient>(calculationResult);
    } catch (error) {
      return serverError();
    }
  }
}
