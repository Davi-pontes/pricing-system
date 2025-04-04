import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { IProductIngredient } from "@/interfaces/productIngredients";
import { MySqlGetProductRepository } from "@/repository/product/get-product";
import { MySqlGetSpecificProductIngredientRepository } from "@/repository/productIngredient/get-specificProductIngredient";
import { MySqlUpdateSpecificProductIngredientRepository } from "@/repository/productIngredient/update-specificProductIngredient";
import { UpdateProductComingIngredientController } from "../product/update-productComingIngredient";
import { MySqlGetIngredientByNameRepository } from "@/repository/productIngredient/get-ingredientByName";
import { GetDateAndHoursCurrent } from "@/generators/dateCurrent";
import { CalculatorCostOfAnIngredient } from "@/service/calculation/ingredientUsageCostCalsulator";

export class UpdateSpecificProductIngredientController implements IController {
  constructor(
    private readonly mySqlUpdateSpecificProducIngredientRepository: MySqlUpdateSpecificProductIngredientRepository
  ) { }

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      if (!httpRequest.body) return badRequest("Please specify a body");

      const { changeInformation, idUser } = httpRequest.body;

      const mySqlGetIngredientByNameRepository =
        new MySqlGetIngredientByNameRepository();
      // Get all products and ingredient that have the ingredient
      const ingredientsInDataBaseByName =
        await mySqlGetIngredientByNameRepository.getIngredientByName(
          changeInformation.name,
          idUser
        );

      if (ingredientsInDataBaseByName.length === 0)
        return badRequest("Not possible updated product ingredient");
      let updatedNumbersIngredient
      for (let ingredient of ingredientsInDataBaseByName) {
        const ingredientWithUpdatedPrice = {...ingredient, price: changeInformation.price}
        const updatedCost =
          CalculatorCostOfAnIngredient.calculate(ingredientWithUpdatedPrice);

        const getProductRepository = new MySqlGetProductRepository();

        const updateProductsThatTheIngredientBelongsTo = new UpdateProductComingIngredientController(getProductRepository);
        // Update pricing the product
        updatedNumbersIngredient =
          await updateProductsThatTheIngredientBelongsTo.updateProduct(
            ingredientsInDataBaseByName,
            ingredient,
            updatedCost
          );

        if (!updatedNumbersIngredient)
          return badRequest("Not possible updated product ingredient");

        const updateDateAndTime = GetDateAndHoursCurrent.dateTime();

        ingredient.price = changeInformation.price;
        ingredient.updated_at = updateDateAndTime;
        const updateSpecificProductIngredient =
          await this.mySqlUpdateSpecificProducIngredientRepository.updateSpecificProductIngredientController(
            ingredient.id,
            ingredient
          );

        if (updateSpecificProductIngredient === 0)
          return badRequest("Not possible updated product ingredient");
      }

      return ok<IProductIngredient>({
        updatedNumbersIngredient,
        updatedIngredient: changeInformation,
      });
    } catch (error) {
      return serverError();
    }
  }
}
