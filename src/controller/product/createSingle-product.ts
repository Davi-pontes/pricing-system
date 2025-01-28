import { IdGenerator } from "@/generators/idGenerator";
import { badRequest, created, serverError } from "@/helper/helper";
import { IController } from "@/interfaces/global";
import { HttpRequest, HttpResponse } from "@/interfaces/http";
import { ICreateProductRepository, IProduct } from "@/interfaces/product";
import { MySqlCreateStockRepository } from "@/repository/stockProduct/create-stock";
import { FormatedDatas } from "@/utils/FormatedDatas";
import { VProduct } from "@/validations/product/product";

export class CreateSingleProductController implements IController {
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
      const datasProduct = httpRequest.body;

      const validateOnlyProduct =
        VProduct.ValidatePropsSetOnlyProduct(datasProduct);
      
      if (validateOnlyProduct.error) {
        const errors = validateOnlyProduct.error.issues
        
        return badRequest(errors[0].message);
      }

      const formatedDatas = FormatedDatas.formatedDatasToProduct(datasProduct);

      formatedDatas.id_product = IdGenerator.generator();

      const product = await this.createProductRepository.createProduct(
        formatedDatas
      );

      const createStockRepository = new MySqlCreateStockRepository()

      await createStockRepository.createSctock({quantity: datasProduct.qtdStock, id_product: formatedDatas.id_product})

      return created<IProduct>(product);
    } catch (error) {
      return serverError();
    }
  }
}
