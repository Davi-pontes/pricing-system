import { BaseCalculator } from "./baseCalculator";
import { ICreateProductIngredientParams } from "@/interfaces/productIngredients";

export class PricingProductWithIngredientCalculator
  extends BaseCalculator
{
  getTotalCostAllIngredients(
    data: Array<ICreateProductIngredientParams>
  ): number {
    return data.reduce(
      (acc: number, data: ICreateProductIngredientParams) =>
        acc + data.ingredient_cost,
      0
    );
  }

  getCostFixed(costAllIngredient: number, operationalCost: number) {
    return (costAllIngredient * operationalCost) / 100;
  }

  getPricePerUnit(cost: number, qtyInBox: number): number {
    return super.getPricePerUnit(cost, qtyInBox);
  }

  getRevenueCost(
    costAllIngredient: number,
    fixedCost: number,
  ): number {
    return costAllIngredient + fixedCost;
  }

  getFinalRevenuePrice(profit: number, revenueCost: number): number {
    return profit + revenueCost
  }

  getProfit(cost: number, profitPercentage: number): number {
    return super.getProfit(cost, profitPercentage);
  }

  getProfitPercentage(cost: number, sellingPrice: number): number {
    return super.getProfitPercentage(cost, sellingPrice);
  }
}
