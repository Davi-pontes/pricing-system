import { ZodError } from "zod";

export interface IBasesCalculation {
  tax: number;
  fixedCost: number;
  freigth: number;
  priceProduct: number;
  qtyInBox: number;
  sellingPrice: number;
  profitPercentage: number;
}
export interface ICalculationResult {
  costProduct: number;
  pricePerUnit: number;
  priceWithProfit: number;
  profit: number;
  profitPercentage: number;
}

export interface IPricingCalculator {
  getTotalCost(data: any): number;
  getPricePerUnit(costProduct: number, qtyInBox: number): number;
  getPricePerUnitWithProfit(
    costProduct: number,
    profit: number,
    qtyInBox: number
  ): number;
  getProfit(costProduct: number, profitPercentage: number): number;
  getProfitPercentage(costProduct: number, sellingPrice: number): number;
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ZodError };
