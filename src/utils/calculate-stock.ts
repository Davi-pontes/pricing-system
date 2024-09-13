import { IProduct } from "@/interfaces/product";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { INecessaryStock } from "@/interfaces/stock";
import { VStock } from "@/validations/stock/validate-stock";

export class CalculateStock {
    private datasProducts: IProduct[]
    private datasIngredients: IProductIngredient[]
    private period: number

    constructor(datasProducts: IProduct[], datasIngredients: IProductIngredient[], period: number) {
        this.datasProducts = datasProducts
        this.datasIngredients = datasIngredients
        this.period = period
    }
    async calculateStockToOnePeriod(): Promise<Array<INecessaryStock>> {
        const calculationsAlreadyDone: Array<INecessaryStock> = []
        for (let product of this.datasProducts) {
            
            const ingredientOfThisProduct = this.datasIngredients.filter((ingredient) => product.id_product.includes(ingredient.id_product))
            const calculatedAllIngredients = this.calculateIngredientController(product,ingredientOfThisProduct)

            calculatedAllIngredients.map(value => calculationsAlreadyDone.push(value))
        }
        return calculationsAlreadyDone.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        })
    }
    private calculateIngredientController(product: IProduct, ingredientOfThisProduct: Array<IProductIngredient>): Array<INecessaryStock> {
        const calculatedIngredients = []

        for (let ingredient of ingredientOfThisProduct) {
            const usagePerProduct = this.calculateUsagePerProduct(product,ingredient)

            const numbersCurrent = this.calculateIngredient(usagePerProduct, product)

            const quantity_in_stock = ingredient.quantity_in_stock * ingredient.weight

            const quantityToBuy = this.calculateDifferenceBetweenCurrentAndRequiredStock(quantity_in_stock,numbersCurrent)

            const state = VStock.validateStateStock(numbersCurrent,quantity_in_stock)

            const dataToSend: INecessaryStock = {
                name: ingredient.name,
                quantityCurrent: quantity_in_stock,
                necessaryAmount: numbersCurrent,
                state: state,
                quantityToBuy: quantityToBuy
            }

            calculatedIngredients.push(dataToSend)
        }
        return calculatedIngredients
    }
    private calculateUsagePerProduct(product: IProduct, ingredient: IProductIngredient): number{
        const usagePerProduct = ingredient.quantity / product.income

        return usagePerProduct
    }
    private calculateIngredient(usagePerUnit: number, product: IProduct) {
        let numbersCurrent: number

        if (product.chengeIncome) {
            numbersCurrent = usagePerUnit * product.chengeIncome
        } else {
            numbersCurrent = usagePerUnit * product.income
        }
        const formatedNumbers = Math.floor(numbersCurrent);

        return formatedNumbers
    }
    private calculateDifferenceBetweenCurrentAndRequiredStock(quantityInStock: number, quantityNecessaryInStock:number){
        if(quantityInStock === 0){
            return quantityNecessaryInStock
        } else if(quantityInStock > quantityNecessaryInStock) {
            return 0
        } else {
            return quantityNecessaryInStock - quantityInStock
        }
    }
}