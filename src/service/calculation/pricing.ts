import { ICalculateParams } from "@/interfaces/calculate";
import { PricingCalculator } from "./pricingCalculator";

export class PricingService {
  private calculator: PricingCalculator;

  constructor(data: ICalculateParams) {
    this.calculator = new PricingCalculator(data);
  }

  calculate() {
    return {
      costProduct: this.calculator.getTotalCost(),
      pricePerUnit: this.calculator.getPricePerUnit(),
      pricePlusProfit: this.calculator.getPricePerUnitWithProfit(),
      profit: this.calculator.getProfit(),
      profitPercentage: this.calculator.getProfitPercentage(),
    };
  }
}
