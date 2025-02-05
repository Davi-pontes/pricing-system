import { IProduct } from "@/interfaces/product";

export class CalculateAverage {
  static calculateAverageProductProfit(datasProduct: IProduct[]): number {
    const sumValues = datasProduct.reduce(
      (accumulator, currentvalue) =>
        accumulator + currentvalue.profit_percentage,
      0
    );

    const average = sumValues / datasProduct.length * 100;

    return average;
  }
}
