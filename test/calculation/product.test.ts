import { PricingService } from "@/service/calculation/pricing";
import { PricingCalculator } from "@/service/calculation/pricingCalculator";

describe("Calculate product without ingredient", () => {
  test("Calculate product without profit percentage", () => {
    const productDatas = {
      tax: 0.32,
      fixedCost: 1.22,
      freigth: 2.5,
      priceProduct: 2.72,
      qtyInBox: 6,
      costProduct: 3.22,
      sellingPrice: 0,
      profitPercentage: 0,
    };

    const calculator = new PricingCalculator();

    const pricingService = new PricingService(productDatas, calculator);

    const result = pricingService.calculate();

    expect(result.costProduct).toBeCloseTo(6.76);
    expect(result.pricePerUnit).toBeCloseTo(1.126666666666667, 10);
    expect(result.priceWithProfit).toBeCloseTo(1.126666666666667, 10);
    expect(result.profitPercentage).toBeCloseTo(0);
    expect(result.profit).toBeCloseTo(0);
  });
  test("Calculate product with profit percentage", () => {
    const productDatas = {
      tax: 0.32,
      fixedCost: 1.22,
      freigth: 2.5,
      priceProduct: 2.72,
      qtyInBox: 6,
      sellingPrice: 0,
      profitPercentage: 0.80,
    };

    const calculator = new PricingCalculator();

    const pricingService = new PricingService(productDatas, calculator);

    const result = pricingService.calculate();

    expect(result.costProduct).toBeCloseTo(6.76);
    expect(result.pricePerUnit).toBeCloseTo(1.126666666666667, 10);
    expect(result.priceWithProfit).toBeCloseTo(2.028, 10);
    expect(result.profitPercentage).toBeCloseTo(0.80);
    expect(result.profit).toBeCloseTo(5.408);
  });
  test("Calculate product with selling price", () => {
    const productDatas = {
      tax: 0.32,
      fixedCost: 1.22,
      freigth: 2.5,
      priceProduct: 2.72,
      qtyInBox: 6,
      sellingPrice: 3.37,
      profitPercentage: 0,
    };

    const calculator = new PricingCalculator();

    const pricingService = new PricingService(productDatas, calculator);

    const result = pricingService.calculate();

    expect(result.costProduct).toBeCloseTo(6.76);
    expect(result.pricePerUnit).toBeCloseTo(1.126666666666667, 10);
    expect(result.priceWithProfit).toBeCloseTo(3.37, 10);
    expect(result.profitPercentage).toBeCloseTo(1.9911242603550294,10);
    expect(result.profit).toBeCloseTo(13.459999999999999);
  });
  test("Calculate product with lower sales price", () => {
    const productDatas = {
      tax: 0,
      fixedCost: 0,
      freigth: 0,
      priceProduct: 7,
      qtyInBox: 1,
      sellingPrice: 5,
      profitPercentage: 0,
    };

    const calculator = new PricingCalculator();

    const pricingService = new PricingService(productDatas, calculator);

    const result = pricingService.calculate();

    expect(result.costProduct).toBeCloseTo(7);
    expect(result.pricePerUnit).toBeCloseTo(7, 10);
    expect(result.priceWithProfit).toBeCloseTo(5, 10);
    expect(result.profitPercentage).toBeCloseTo(-0.2857142857142857,10);
    expect(result.profit).toBeCloseTo(-2);
  });
  test("Calculates the product with just 1 value filled in and with sales price", () => {
    const productDatas = {
      tax: 3,
      fixedCost: 0,
      freigth: 0,
      priceProduct: 0,
      qtyInBox: 1,
      sellingPrice: 4,
      profitPercentage: 0,
    };

    const calculator = new PricingCalculator();

    const pricingService = new PricingService(productDatas, calculator);

    const result = pricingService.calculate();

    expect(result.costProduct).toBeCloseTo(3);
    expect(result.pricePerUnit).toBeCloseTo(3, 10);
    expect(result.priceWithProfit).toBeCloseTo(4, 10);
    expect(result.profitPercentage).toBeCloseTo(0.3333333333333333,10);
    expect(result.profit).toBeCloseTo(1);
  });
  test("Calculate product with zero quantity in box", () => {
    const productDatas = {
      tax: 0.32,
      fixedCost: 1.22,
      freigth: 2.5,
      priceProduct: 2.72,
      qtyInBox: 0,
      sellingPrice: 3.37,
      profitPercentage: 0.5,
    };

    const calculator = new PricingCalculator();
    const pricingService = new PricingService(productDatas, calculator);
    expect(() => pricingService.calculate()).toThrowError("Quantidade em caixa não pode ser 0.");
  });

  test("Calculate product with negative price", () => {
    const productDatas = {
      tax: 0.32,
      fixedCost: 1.22,
      freigth: 2.5,
      priceProduct: -2.72,
      qtyInBox: 6,
      sellingPrice: 3.37,
      profitPercentage: 0.5,
    };

    const calculator = new PricingCalculator();
    const pricingService = new PricingService(productDatas, calculator);
    expect(() => pricingService.calculate()).toThrowError("Preço de venda não pode ser negativo.");
  });

  test("Calculate product with undefined values", () => {
    const productDatas = {
      tax: undefined,
      fixedCost: 1.22,
      freigth: 2.5,
      priceProduct: 2.72,
      qtyInBox: 6,
      sellingPrice: 3.37,
      profitPercentage: 0.5,
    } as any;

    const calculator = new PricingCalculator();
    const pricingService = new PricingService(productDatas, calculator);
    expect(() => pricingService.calculate()).toThrowError("Valor invalido");
  });
});
