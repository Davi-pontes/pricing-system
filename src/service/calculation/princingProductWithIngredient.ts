import {
  IBasesCalculationProductWithIngredient,
  IPricingProductWithIngredientCalculator,
} from "@/interfaces/calculate";

export class PricingProductWithIngredientService {
  constructor(
    private readonly basesCalculation: IBasesCalculationProductWithIngredient,
    private readonly calculator: IPricingProductWithIngredientCalculator
  ) {}
  calculate(): any {
    const productInformation = this.basesCalculation.productInformation;
    const productIngredients = this.basesCalculation.productIngredients;

    productInformation.cost_of_all_ingredients =
      this.calculator.getTotalCostAllIngredients(productIngredients);

    productInformation.fixed_cost = this.calculator.getCostFixed(
      productInformation.cost_of_all_ingredients,
      productInformation.operacional_cost
    );

    productInformation.revenue_cost = this.calculator.getRevenueCost(
      productInformation.cost_of_all_ingredients,
      productInformation.fixed_cost,
    );
    productInformation.profit = this.calculator.getProfit(
      productInformation.revenue_cost,
      productInformation.profit_percentage
    );

    productInformation.final_recipe_price =
      this.calculator.getFinalRevenuePrice(
        productInformation.profit,
        productInformation.revenue_cost
      );

    productInformation.price_per_unit = this.calculator.getPricePerUnit(
      productInformation.final_recipe_price,
      productInformation.income
    );

    return {
        productInformation,
        productIngredients
    }
  }
}
