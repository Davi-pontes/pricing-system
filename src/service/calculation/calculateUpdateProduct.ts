import { IProduct } from "@/interfaces/product";
import { PricingProductWithIngredientCalculator } from "@/service/calculation/pricingProductWithIngredientCalculator";

export class CalculatedUpdate extends PricingProductWithIngredientCalculator {
  constructor(private readonly datasProduct: IProduct) {
    super();
  }

  public updateNumberProduct(): IProduct {
    this.datasProduct.fixed_cost = super.getCostFixed(
      this.datasProduct.cost_of_all_ingredients,
      this.datasProduct.operacional_cost
    );

    this.datasProduct.revenue_cost = super.getRevenueCost(
      this.datasProduct.cost_of_all_ingredients,
      this.datasProduct.fixed_cost
    );

    this.datasProduct.profit = super.getProfit(
      this.datasProduct.revenue_cost,
      this.datasProduct.profit_percentage
    );

    this.datasProduct.final_recipe_price = super.getFinalRevenuePrice(
      this.datasProduct.profit,
      this.datasProduct.revenue_cost
    );

    this.datasProduct.price_per_unit = super.getPricePerUnit(
      this.datasProduct.final_recipe_price,
      this.datasProduct.income
    );

    return this.datasProduct;
  }
}
