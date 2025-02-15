import { IPricingProductWithIngredientCalculator } from "@/interfaces/calculate";
import { BaseCalculator } from "./baseCalculator";
import { ICreateProductIngredientParams } from "@/interfaces/productIngredients";

export class PricingProductWithIngredientCalculator
  extends BaseCalculator
{
  protected getTotalCostAllIngredients(
    data: Array<ICreateProductIngredientParams>
  ): number {
    return data.reduce(
      (acc: number, data: ICreateProductIngredientParams) =>
        acc + data.ingredient_cost,
      0
    );
  }

  protected getCostFixed(costAllIngredient: number, operationalCost: number) {
    return (costAllIngredient * operationalCost) / 100;
  }

  protected getPricePerUnit(cost: number, qtyInBox: number): number {
    return super.getPricePerUnit(cost, qtyInBox);
  }

  protected getRevenueCost(
    costAllIngredient: number,
    fixedCost: number,
  ): number {
    return costAllIngredient + fixedCost;
  }

  protected getFinalRevenuePrice(profit: number, revenueCost: number): number {
    return profit + revenueCost
  }

  protected getProfit(cost: number, profitPercentage: number): number {
    return super.getProfit(cost, profitPercentage);
  }

  protected getProfitPercentage(cost: number, sellingPrice: number): number {
    return super.getProfitPercentage(cost, sellingPrice);
  }
}
