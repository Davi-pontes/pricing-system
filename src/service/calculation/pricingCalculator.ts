import { IPricingCalculator } from "@/interfaces/calculate";
import { BaseCalculator } from "./baseCalculator";

export class PricingCalculator extends BaseCalculator implements IPricingCalculator {
  getTotalCost(data: any): number {
    return data.tax + data.fixedCost + data.freigth + data.priceProduct;
  }

  getPricePerUnit(cost: number, qtyInBox: number): number {
    return super.getPricePerUnit(cost, qtyInBox);
  }

  getPricePerUnitWithProfit(cost: number, profit: number, qtyInBox: number): number {
    return super.getPricePerUnit(cost + profit, qtyInBox);
  }

  getProfit(cost: number, profitPercentage: number): number {
    return super.getProfit(cost, profitPercentage);
  }

  getProfitPercentage(cost: number, sellingPrice: number): number {
    return super.getProfitPercentage(cost, sellingPrice);
  }
}