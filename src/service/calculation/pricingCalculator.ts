import { IBasesCalculation, IPricingCalculator } from "@/interfaces/calculate";

export class PricingCalculator implements IPricingCalculator {
  getTotalCost(data: any): number {
    return data.tax + data.fixedCost + data.freigth + data.priceProduct;
  }

  getPricePerUnit(costProduct: any, qtyInBox: any): number {
    return costProduct / qtyInBox;
  }

  getPricePerUnitWithProfit(
    costProduct: number,
    profit: number,
    qtyInBox: number
  ): number {
    return (costProduct + profit) / qtyInBox;
  }

  getProfit(costProduct: any, profitPercentage: any): number {
    const profitAmount = costProduct * profitPercentage;
    return profitAmount;
  }

  getProfitPercentage(costProduct: number, sellingPrice: number): number {
    const absolutProfit = Math.abs(costProduct - sellingPrice);

    const profitPercentage = absolutProfit / costProduct;

    return costProduct > sellingPrice ? -profitPercentage : profitPercentage;
  }
}
