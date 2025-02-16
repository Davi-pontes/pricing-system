import { CalculatorCostOfAnIngredient } from "@/service/calculation/ingredientUsageCostCalsulator"

describe('Calculate ingredient', () => {
    test('Calculate cost of an ingredient', () => {
        const ingredient = {
            id: 2,
            name: 'Trigo',
            weight: 1000,
            unit1: 'GRAMAS',
            price: 7,
            quantity: 1000,
            unit2: null,
            ingredient_cost: 0,
            id_product: 'iKawXrN8g',
            quantity_in_stock: null,
            total_cash_in_stock: null
          }
          const result = CalculatorCostOfAnIngredient.calculate(ingredient)
          expect(result).toBeCloseTo(7)
    })
})