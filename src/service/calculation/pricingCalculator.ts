import { ICalculateParams } from "@/interfaces/calculate";

export class PricingCalculator {
  private data: ICalculateParams;

  constructor(data: ICalculateParams) {
    this.data = data;
  }

  getTotalCost(): number {
    return (
      this.data.tax +
      this.data.fixedCost +
      this.data.freigth +
      this.data.priceProduct
    );
  }

  getPricePerUnit(): number {
    return this.getTotalCost() / this.data.qtyInBox;
  }

  getPricePerUnitWithProfit(): number {
    return (this.getTotalCost() + this.data.profit) / this.data.qtyInBox;
  }

  getProfit(): number {
    const profitAmount = (this.getTotalCost() * this.data.profitPercentage) / 100;
    return this.getTotalCost() / this.data.qtyInBox + profitAmount;
  }

  getProfitPercentage(): number {
    const costPerUnit = this.getTotalCost() / this.data.qtyInBox;
    const profitPerUnit = this.data.sellingPrice - costPerUnit;

    return profitPerUnit / costPerUnit;
  }
}
