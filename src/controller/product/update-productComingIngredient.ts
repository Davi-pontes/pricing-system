import { IGetProductRepository, IUpdateProductComingIngredient, IUpdateProductComingIngredientController } from "@/interfaces/product";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlUpdateProductRepository } from "@/repository/product/update-product";
import { Calculate } from "@/utils/calculate";

export class UpdateProductComingIngredientController implements IUpdateProductComingIngredientController {
    constructor(private readonly mySqlGetProductRepository: IGetProductRepository) { }

    async updateProduct(allProductIngredientsByName: Array<IProductIngredient>, ingredientPreviousProduct: IProductIngredient, currentPrice: number): Promise<any> {
        let quantityOfProductsChanged = 0
        let updatedIngredientCost
        
        for (let { id_product } of allProductIngredientsByName) {
            const product = await this.mySqlGetProductRepository.getProductById(id_product)

            const calculateNumbers = new Calculate(product, ingredientPreviousProduct, currentPrice)

            const updatedNumbers = calculateNumbers.updateAllNumbersProductAndIngredients()

            updatedIngredientCost = updatedNumbers.updatedIngredientCost

            const updateProductRepository = new MySqlUpdateProductRepository()

            await updateProductRepository.updateProduct(updatedNumbers.datasProduct.id_product, updatedNumbers.datasProduct)

            quantityOfProductsChanged++
        }
        return {quantityOfProductsChanged,updatedIngredientCost}
    }

}