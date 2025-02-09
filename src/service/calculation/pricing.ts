import {
  IBasesCalculation,
  ICalculationResult,
  IPricingCalculator,
} from "@/interfaces/calculate";
import { PricingCalculator } from "./pricingCalculator";
import { VPropsToCalculation } from "@/validations/calculation/calculation";
import { ValidationError } from "@/global/errors/validationError";

export class PricingService {
  constructor(
    private readonly basesCalculation: IBasesCalculation,
    private readonly calculator: IPricingCalculator
  ) {}

  calculate(): ICalculationResult {

    const validateProsBasesCalculation = VPropsToCalculation.ValidadePropsBasesCalculation(this.basesCalculation)

    if(!validateProsBasesCalculation.success){
      throw new ValidationError(validateProsBasesCalculation.error.issues[0].message)
    }


    const basesToCalculatorCost = {
      tax: this.basesCalculation.tax,
      fixedCost: this.basesCalculation.fixedCost,
      freigth: this.basesCalculation.freigth,
      priceProduct: this.basesCalculation.priceProduct,
    };
    const costProduct = this.calculator.getTotalCost(basesToCalculatorCost);

    if (this.basesCalculation.sellingPrice > 0) {
      const salesPriceMultipliedQuantity = this.basesCalculation.sellingPrice * this.basesCalculation.qtyInBox

      this.basesCalculation.profitPercentage = this.calculateProfitPercentage(
        costProduct,
        salesPriceMultipliedQuantity
      );
    }
    let profit = 0;

    if (this.basesCalculation.profitPercentage != 0)
      profit = this.calculator.getProfit(
        costProduct,
        this.basesCalculation.profitPercentage
      );

    const pricePerUnit = this.calculator.getPricePerUnit(
      costProduct,
      this.basesCalculation.qtyInBox
    );

    const priceWithProfit = this.calculator.getPricePerUnitWithProfit(
      costProduct,
      profit,
      this.basesCalculation.qtyInBox
    );

    return {
      costProduct,
      pricePerUnit,
      priceWithProfit,
      profit,
      profitPercentage: this.basesCalculation.profitPercentage,
    };
  }
  calculateProfitPercentage(costProduct: number, sellingPrice: number): number {
    return this.calculator.getProfitPercentage(costProduct, sellingPrice);
  }
}
