import { IPricingProductWithIngredientCalculator } from "@/interfaces/calculate";
import { BaseCalculator } from "./baseCalculator";

export class PricingProductWithIngredientCalculator extends BaseCalculator implements IPricingProductWithIngredientCalculator {
  getTotalCostAllIngredients(data: any): number {
    return data.reduce(
      (acc: number, data: any) => acc + data.ingredient_cost,
      0
    );
  }

  getCostFixed(costAllIngredient: number, operationalCost: number) {
    return (costAllIngredient * operationalCost) / 100;
  }

  getPricePerUnit(cost: number, qtyInBox: number): number {
    return super.getPricePerUnit(cost, qtyInBox);
  }

  getPricePerUnitWithProfit(
    cost: number,
    profit: number,
    qtyInBox: number
  ): number {
    return super.getPricePerUnit(cost + profit, qtyInBox);
  }

  getProfit(cost: number, profitPercentage: number): number {
    return super.getProfit(cost, profitPercentage);
  }

  getProfitPercentage(cost: number, sellingPrice: number): number {
    return super.getProfitPercentage(cost, sellingPrice);
  }
}
