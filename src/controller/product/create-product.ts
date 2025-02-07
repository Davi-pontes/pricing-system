import { IdGenerator } from "@/generators/idGenerator";
import { badRequest, created, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ICreateProductRepository, IProduct } from "@/interfaces/product";
import { MySqlCreateProductIngredientRepository } from "@/repository/productIngredient/create-productIngredient";
import { VProduct } from "@/validations/product/product";
import { CreateProductIngredientController } from "../productIngredien/create-productIngredient";
import { ValidationErrorProductIngredient } from "../productIngredien/errors/validationError";
import { ValidationErrorProduct } from "./errors/validateError";
import { ICreateProductIngredientParams } from "@/interfaces/productIngredients";
import { MySqlCreateStockRepository } from "@/repository/stockProduct/create-stock";

export class CreateProductController implements IController {
  constructor(
    private readonly createProductRepository: ICreateProductRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IProduct | string>> {
    try {
      if (!httpRequest.body) {
        return badRequest(`Please specify a body`);
      }
      const dataProduct = httpRequest.body;

      const validatePropsProduct = await VProduct.ValidatePropsProduct(
        dataProduct.productInformation
      );

      if (!validatePropsProduct.success) {
        throw new ValidationErrorProduct(
          validatePropsProduct.error.issues[0].message
        );
      }
      const idProduct = IdGenerator.generator();

      dataProduct.productInformation.id_product = idProduct;

      const product = await this.createProductRepository.createProduct(
        dataProduct.productInformation
      );

      const createProductIngredientRepository =
        new MySqlCreateProductIngredientRepository();

      const createProductIngredientController =
        new CreateProductIngredientController(
          createProductIngredientRepository
        );

      const dataToCreateProductIngredient =
        dataProduct.productIngredients as ICreateProductIngredientParams[];

      const addIngredientProductId = dataToCreateProductIngredient.map(
        (param) => ({ ...param, id_product: idProduct })
      );

      await createProductIngredientController.handle(addIngredientProductId);

      const createStockRepository = new MySqlCreateStockRepository();

      await createStockRepository.createSctock({
        quantity: 0,
        id_product: idProduct,
      });

      return created<IProduct>(product);
    } catch (error: unknown) {
      if (error instanceof ValidationErrorProductIngredient) {
        return badRequest(error.message);
      }
      if (error instanceof ValidationErrorProduct) {
        return badRequest(error.message);
      }
      return serverError();
    }
  }
}
