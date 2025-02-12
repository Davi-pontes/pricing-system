// Calculadora base
export abstract class BaseCalculator {
    protected getProfit(cost: number, profitPercentage: number): number {
      return cost * profitPercentage;
    }
  
    protected getPricePerUnit(cost: number, quantity: number): number {
      return cost / quantity;
    }
  
    protected getProfitPercentage(cost: number, sellingPrice: number): number {
      const absoluteProfit = Math.abs(cost - sellingPrice);
      const profitPercentage = absoluteProfit / cost;
      return cost > sellingPrice ? -profitPercentage : profitPercentage;
    }
  }