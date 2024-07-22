import { IGetProductRepository, IUpdateProductComingIngredient, IUpdateProductComingIngredientController } from "@/interfaces/product";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlUpdateProductRepository } from "@/repository/product/update-product";
import { Calculate } from "@/utils/calculate";

export class UpdateProductComingIngredientController implements IUpdateProductComingIngredientController {
    constructor(private readonly mySqlGetProductRepository: IGetProductRepository) { }

    async updateProduct(ids_products: Array<IUpdateProductComingIngredient>, ingredientPreviousProduct: IProductIngredient, currentProductIngredient: IProductIngredient): Promise<IProductIngredient | null> {
        let updatedProductIngredient = null
        for (let { id_product } of ids_products) {
            const product = await this.mySqlGetProductRepository.getProductById(id_product)

            const calculateNumbers = new Calculate(product, ingredientPreviousProduct, currentProductIngredient)

            const updatedNumbers = calculateNumbers.updateAllNumbersProductAndIngredients()

            const updateProductRepository = new MySqlUpdateProductRepository()

            await updateProductRepository.updateProduct(updatedNumbers.datasProduct.id_product, updatedNumbers.datasProduct)

            updatedProductIngredient = updatedNumbers.currentProductIngredient
        }
        return updatedProductIngredient
    }

}