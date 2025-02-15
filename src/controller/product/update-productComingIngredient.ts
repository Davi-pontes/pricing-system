import {
  IGetProductRepository,
  IProduct,
  IUpdateProductComingIngredient,
  IUpdateProductComingIngredientController,
} from "@/interfaces/product";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlUpdateProductRepository } from "@/repository/product/update-product";
import { CalculatedUpdate } from "@/service/calculation/calculateUpdateProduct";

export class UpdateProductComingIngredientController implements IUpdateProductComingIngredientController {
  constructor(
    private readonly mySqlGetProductRepository: IGetProductRepository
  ) {}

  async updateProduct(
    allProductIngredientsByName: Array<IProductIngredient>,
    ingredientPreviousProduct: IProductIngredient,
    currentPrice: number
  ): Promise<any> {
    let quantityOfProductsChanged = 0;
    let productUpdated: Array<IProduct> = [];

    for (let { id_product } of allProductIngredientsByName) {
      //Get product by id
      const product = await this.mySqlGetProductRepository.getProductById(
        id_product
      );
      //Remove qtdStock
      let { qtdStock, ...productWithoutQtdStock } = product as any;
      //Update precification the product

      productWithoutQtdStock.cost_of_all_ingredients =
        productWithoutQtdStock.cost_of_all_ingredients -
        ingredientPreviousProduct.ingredient_cost +
        currentPrice;

      const calculateNumbers = new CalculatedUpdate(productWithoutQtdStock);

      const updatedNumbers = calculateNumbers.updateNumberProduct();

      const updateProductRepository = new MySqlUpdateProductRepository();

      await updateProductRepository.updateProduct(
        updatedNumbers.id_product,
        updatedNumbers
      );

      quantityOfProductsChanged++;
      productUpdated.push(productWithoutQtdStock);
    }
    return { quantityOfProductsChanged, productUpdated };
  }
}
