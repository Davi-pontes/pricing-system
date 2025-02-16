import { PricingProductWithIngredientCalculator } from "@/service/calculation/pricingProductWithIngredientCalculator";
import { PricingProductWithIngredientService } from "@/service/calculation/princingProductWithIngredient";

describe("Calculate product with ingredient", () => {
  test("Calculate product with ingredient", () => {
    const productIngredientDatas = {
      productInformation: {
        income: 1,
        recipe_time: 0,
        profit_percentage: 1,
        labor: 0,
        operacional_cost: 2.32,
        cost_of_all_ingredients: 0,
      },
      productIngredients: [
        {
          name: "Teste",
          weight: 320,
          unit1: "GRAMAS",
          price: 4.43,
          quantity: 320,
          ingredient_cost: 4.43,
        },
      ],
    };

    const calculator = new PricingProductWithIngredientCalculator();
    const calculateProductIngredientService =
      new PricingProductWithIngredientService(
        productIngredientDatas,
        calculator
      );
    const result = calculateProductIngredientService.calculate();

    expect(result.cost_of_all_ingredients).toBeCloseTo(4.43);
    expect(result.fixed_cost).toBeCloseTo(0.102776, 10);
    expect(result.revenue_cost).toBeCloseTo(4.532776, 10);
    expect(result.profit).toBeCloseTo(4.532776, 10);
    expect(result.final_recipe_price).toBeCloseTo(
      9.065552,
      10
    );
    expect(result.price_per_unit).toBeCloseTo(9.065552, 10);
  });

  test("Calculate product with multiple ingredients", () => {
    const productIngredientDatas = {
      productInformation: {
        income: 1,
        recipe_time: 0,
        profit_percentage: 1,
        labor: 0,
        operacional_cost: 3.5,
        cost_of_all_ingredients: 0,
      },
      productIngredients: [
        {
          name: "Flour",
          weight: 500,
          unit1: "GRAMAS",
          price: 2.5,
          quantity: 500,
          ingredient_cost: 2.5,
        },
        {
          name: "Sugar",
          weight: 200,
          unit1: "GRAMAS",
          price: 1.2,
          quantity: 200,
          ingredient_cost: 1.2,
        },
      ],
    };

    const calculator = new PricingProductWithIngredientCalculator();
    const calculateProductIngredientService =
      new PricingProductWithIngredientService(
        productIngredientDatas,
        calculator
      );
    const result = calculateProductIngredientService.calculate();

    expect(result.cost_of_all_ingredients).toBeCloseTo(3.7);
    expect(result.fixed_cost).toBeCloseTo(0.13);
    expect(result.revenue_cost).toBeCloseTo(3.83);
    expect(result.profit).toBeCloseTo(3.83);
    expect(result.final_recipe_price).toBeCloseTo(7.659000000000001,6);
    expect(result.price_per_unit).toBeCloseTo(7.659000000000001,6);
  });

  test("Calculate product with zero fixed cost", () => {
    const productIngredientDatas = {
      productInformation: {
        income: 1,
        recipe_time: 0,
        profit_percentage: 1,
        labor: 0,
        operacional_cost: 0,
        cost_of_all_ingredients: 0,
      },
      productIngredients: [
        {
          name: "Orange",
          weight: 300,
          unit1: "GRAMAS",
          price: 2,
          quantity: 300,
          ingredient_cost: 2,
        },
      ],
    };

    const calculator = new PricingProductWithIngredientCalculator();
    const calculateProductIngredientService =
      new PricingProductWithIngredientService(
        productIngredientDatas,
        calculator
      );
    const result = calculateProductIngredientService.calculate();

    expect(result.cost_of_all_ingredients).toBeCloseTo(2);
    expect(result.fixed_cost).toBeCloseTo(0);
    expect(result.revenue_cost).toBeCloseTo(2);
    expect(result.profit).toBeCloseTo(2);
    expect(result.final_recipe_price).toBeCloseTo(4);
    expect(result.price_per_unit).toBeCloseTo(4);
  });

  test("Calculate product with income greater than 1", () => {
    const productIngredientDatas = {
      productInformation: {
        income: 10,
        recipe_time: 0,
        profit_percentage: 1,
        labor: 0,
        operacional_cost: 2,
        cost_of_all_ingredients: 0,
      },
      productIngredients: [
        {
          name: "Butter",
          weight: 200,
          unit1: "GRAMAS",
          price: 3,
          quantity: 200,
          ingredient_cost: 3,
        },
      ],
    };

    const calculator = new PricingProductWithIngredientCalculator();
    const calculateProductIngredientService =
      new PricingProductWithIngredientService(
        productIngredientDatas,
        calculator
      );
    const result = calculateProductIngredientService.calculate();

    expect(result.price_per_unit).toBeCloseTo(0.61);
  });
  test("Calculate product real", () => {
    const productIngredientDatas = {
      productInformation: {
        income: 2,
        recipe_time: 90,
        profit_percentage: 1,
        labor: 0,
        operacional_cost: 15,
        cost_of_all_ingredients: 0,
      },
      productIngredients: [
        {
          name: "Ovo",
          weight: 30,
          unit1: "UNIDADE",
          price: 20,
          quantity: 8,
          ingredient_cost: 5.33,
        },
        {
          name: "leite",
          weight: 1000,
          unit1: "ML",
          price: 6,
          quantity: 300,
          ingredient_cost: 1.8,
        },
        {
          name: "leite condensado",
          weight: 395,
          unit1: "GRAMAS",
          price: 6,
          quantity: 790,
          ingredient_cost: 12,
        },
        {
          name: "baunilha",
          weight: 500,
          unit1: "ML",
          price: 20,
          quantity: 3,
          ingredient_cost: 0.12,
        },
        {
          name: "acucar",
          weight: 1000,
          unit1: "GRAMAS",
          price: 5,
          quantity: 200,
          ingredient_cost: 1,
        },
        {
          name: "glucose",
          weight: 1000,
          unit1: "ML",
          price: 20,
          quantity: 8,
          ingredient_cost: 0.16,
        },
        {
          name: "embalagem",
          weight: 1,
          unit1: "UNIDADE",
          price: 5,
          quantity: 2,
          ingredient_cost: 10,
        },
      ],
    };

    const calculator = new PricingProductWithIngredientCalculator();
    const calculateProductIngredientService =
      new PricingProductWithIngredientService(
        productIngredientDatas,
        calculator
      );
    const result = calculateProductIngredientService.calculate();

    expect(result.cost_of_all_ingredients).toBeCloseTo(30.41,5);
    expect(result.fixed_cost).toBeCloseTo(4.56);
    expect(result.revenue_cost).toBeCloseTo(34.9715,5);
    expect(result.profit).toBeCloseTo(34.9715,5);
    expect(result.final_recipe_price).toBeCloseTo(69.943,5);
    expect(result.price_per_unit).toBeCloseTo(34.9715,5);
  });
});
