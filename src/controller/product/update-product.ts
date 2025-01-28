import { badRequest, ok, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { MySqlUpdateProductRepository } from "@/repository/product/update-product";
import { MySqlDeleteProductIngredientRepository } from "@/repository/productIngredient/delete-productIngredient";
import { UpdateProductIngredientController } from "../productIngredien/update-productIngredient";
import { IProduct } from "@/interfaces/product";
import { FormatedDatas } from "@/utils/FormatedDatas";

export class UpdateProductAndProductIngredientController
  implements IController
{
  constructor(
    private readonly mySqlUpdateProductRepository: MySqlUpdateProductRepository
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      if (!httpRequest.body) return badRequest("Please specify a body");

      if (!httpRequest.params) return badRequest("Please specify a params");

      const id_product = httpRequest.params.id;

      const productInformation = httpRequest.body.data.productInformation;

      const productIngredient = httpRequest.body.data.productIngredients;

      const productUpdate =
        await this.mySqlUpdateProductRepository.updateProduct(
          id_product,
          productInformation
        );

      const productIngredientController =
        new MySqlDeleteProductIngredientRepository();

      const updateProductIngredientController =
        new UpdateProductIngredientController(productIngredientController);

      await updateProductIngredientController.updateProductIngredientController(
        id_product,
        productIngredient
      );

      return ok<IProduct>(productUpdate);
    } catch (error) {
      return serverError();
    }
  }
  async updateOnlyProductController(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<any>> {
    try {
      if (!httpRequest.body) return badRequest("Please specify a body");

      if (!httpRequest.params) return badRequest("Please specify a params");

      const idProduct = httpRequest.params.id;

      const productInformation = httpRequest.body;

      const formatedDatas =
        FormatedDatas.formatedDatasToUpdateProduct(productInformation);

      const productUpdate =
        await this.mySqlUpdateProductRepository.updateProduct(
            idProduct,
          formatedDatas
        );
      return ok<IProduct>(productUpdate);
    } catch (error) {
      return serverError();
    }
  }
}
