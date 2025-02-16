import {
  IBasesCalculationProductWithIngredient,
  ICalculationResultProductWithIngredient,
  IPricingProductWithIngredientCalculator,
} from "@/interfaces/calculate";

export class PricingProductWithIngredientService {
  constructor(
    private readonly basesCalculation: IBasesCalculationProductWithIngredient,
    private readonly calculator: IPricingProductWithIngredientCalculator
  ) {}
  calculate(): ICalculationResultProductWithIngredient {
    const productInformation = this.basesCalculation.productInformation;
    const productIngredients = this.basesCalculation.productIngredients;

    productInformation.cost_of_all_ingredients =
      this.calculator.getTotalCostAllIngredients(productIngredients);

    const fixed_cost = this.calculator.getCostFixed(
      productInformation.cost_of_all_ingredients,
      productInformation.operacional_cost
    );

    const revenue_cost = this.calculator.getRevenueCost(
      productInformation.cost_of_all_ingredients,
      fixed_cost
    );
    const profit = this.calculator.getProfit(
      revenue_cost,
      productInformation.profit_percentage
    );

    const final_recipe_price = this.calculator.getFinalRevenuePrice(
      profit,
      revenue_cost
    );

    const price_per_unit = this.calculator.getPricePerUnit(
      final_recipe_price,
      productInformation.income
    );

    return {
      fixed_cost,
      revenue_cost,
      profit,
      final_recipe_price,
      price_per_unit,
      cost_of_all_ingredients: productInformation.cost_of_all_ingredients,
    };
  }
}
